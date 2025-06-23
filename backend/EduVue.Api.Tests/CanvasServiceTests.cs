using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace EduVue.Api.Tests
{
    // Helper HttpMessageHandler to mock HTTP responses
    internal class MockHttpMessageHandler : HttpMessageHandler
    {
        public Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> Handler { get; }

        public MockHttpMessageHandler(Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> handler)
        {
            Handler = handler;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
            => Handler(request, cancellationToken);
    }

    public class CanvasServiceTests
    {
        private static IConfiguration BuildConfig(string? baseUrl = "https://canvas.local", string? token = "token")
        {
            var dict = new Dictionary<string, string?>();
            if (baseUrl != null) dict["Canvas:BaseUrl"] = baseUrl;
            if (token != null) dict["Canvas:Token"] = token;
            return new ConfigurationBuilder().AddInMemoryCollection(dict).Build();
        }

        private static CanvasService CreateService(Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> handler,
                                                   IConfiguration? config = null)
        {
            var http = new HttpClient(new MockHttpMessageHandler(handler));
            config ??= BuildConfig();
            return new CanvasService(http, config);
        }

        // 1. GetUsersAsync() – poprawne pobranie użytkowników
        [Fact]
        public async Task GetUsersAsync_ReturnsUsers()
        {
            var json = "[{\"id\":1,\"name\":\"A\",\"short_name\":\"A\",\"sortable_name\":\"A\",\"email\":\"a@test\",\"login_id\":\"a\"}]";
            var service = CreateService((req, ct) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            }));

            var users = await service.GetUsersAsync();

            Assert.Single(users);
            Assert.Equal(1, users[0].Id);
            Assert.Equal("A", users[0].Name);
        }

        // 2. GetUsersAsync() – nieudane pobranie (błąd serwera)
        [Fact]
        public async Task GetUsersAsync_ErrorReturnsEmpty()
        {
            var service = CreateService((req, ct) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.InternalServerError)));
            var users = await service.GetUsersAsync();
            Assert.Empty(users);
        }

        // 3. GetCurrentUserAsync() – poprawna deserializacja użytkownika
        [Fact]
        public async Task GetCurrentUserAsync_DeserializesCorrectly()
        {
            var json = "{\"id\":2,\"name\":\"B\",\"short_name\":\"B\",\"sortable_name\":\"B\",\"email\":\"b@test\",\"login_id\":\"b\"}";
            var service = CreateService((req, ct) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json")
            }));

            var user = await service.GetCurrentUserAsync();

            Assert.NotNull(user);
            Assert.Equal(2, user!.Id);
            Assert.Equal("B", user.Name);
        }

        // 4. GetCurrentUserAsync() – zwraca null w razie błędu
        [Fact]
        public async Task GetCurrentUserAsync_ReturnsNullOnError()
        {
            var service = CreateService((req, ct) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.Forbidden)));
            var user = await service.GetCurrentUserAsync();
            Assert.Null(user);
        }

        // 5. GetUserByIdAsync() – zawsze zwraca self
        [Fact]
        public async Task GetUserByIdAsync_IgnoresIdAndGetsSelf()
        {
            string? requested = null;
            var service = CreateService((req, ct) =>
            {
                requested = req.RequestUri!.ToString();
                var json = "{\"id\":3}";
                return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json")
                });
            });

            await service.GetUserByIdAsync(123);

            Assert.Contains("/users/self", requested);
        }

        // 6. UpdateUserAsync() – poprawna aktualizacja e-maila
        [Fact]
        public async Task UpdateUserAsync_SendsEmailAndReturnsTrue()
        {
            string? payload = null;
            var service = CreateService((req, ct) =>
            {
                payload = req.Content!.ReadAsStringAsync().Result;
                return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK));
            });

            var result = await service.UpdateUserAsync(new CanvasUser { Id = 4, Email = "new@test" });

            Assert.True(result);
            using var doc = JsonDocument.Parse(payload!);
            Assert.Equal("new@test", doc.RootElement.GetProperty("user").GetProperty("email").GetString());
        }

        // 7. UpdateUserAsync() – błąd przy nieudanej aktualizacji
        [Fact]
        public async Task UpdateUserAsync_ReturnsFalseOnError()
        {
            var service = CreateService((req, ct) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.BadRequest)));
            var result = await service.UpdateUserAsync(new CanvasUser { Id = 5, Email = "e" });
            Assert.False(result);
        }

        // 8. CreateUserAsync() – tworzy użytkownika z poprawnym payloadem
        [Fact]
        public async Task CreateUserAsync_ReturnsCreatedUserWithPayload()
        {
            string? payload = null;
            var jsonResp = "{\"id\":6,\"name\":\"C\",\"short_name\":\"C\",\"sortable_name\":\"C\",\"email\":\"c@test\",\"login_id\":\"c\"}";
            var service = CreateService((req, ct) =>
            {
                payload = req.Content!.ReadAsStringAsync().Result;
                return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(jsonResp, Encoding.UTF8, "application/json")
                });
            });

            var newUser = new CanvasUser { Name = "C", ShortName = "C", SortableName = "C", Email = "c@test", LoginId = "c" };
            var result = await service.CreateUserAsync(2, newUser);

            Assert.NotNull(result);
            Assert.Equal(6, result!.Id);
            using var doc = JsonDocument.Parse(payload!);
            Assert.Equal("c", doc.RootElement.GetProperty("pseudonym").GetProperty("unique_id").GetString());
        }

        // 9. CreateUserAsync() – null przy błędzie (np. 409 Conflict)
        [Fact]
        public async Task CreateUserAsync_ReturnsNullOnError()
        {
            var service = CreateService((req, ct) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.Conflict)));
            var newUser = new CanvasUser { Name = "D", ShortName = "D", SortableName = "D", Email = "d@test", LoginId = "d" };
            var result = await service.CreateUserAsync(1, newUser);
            Assert.Null(result);
        }

        // 10. Błąd inicjalizacji serwisu – brak Canvas:BaseUrl lub Token
        [Fact]
        public void Constructor_ThrowsForMissingConfig()
        {
            var http = new HttpClient(new MockHttpMessageHandler((r, c) => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK))));
            var configMissingUrl = BuildConfig(baseUrl: null);
            Assert.Throws<ArgumentNullException>(() => new CanvasService(http, configMissingUrl));

            var configMissingToken = BuildConfig(token: null);
            Assert.Throws<ArgumentNullException>(() => new CanvasService(http, configMissingToken));
        }
    }
}

