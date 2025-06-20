using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;

// Serwis do komunikacji z Canvas LMS API
public class CanvasService
{
    private readonly HttpClient _http;
    private readonly string _baseUrl;

    public CanvasService(HttpClient http, IConfiguration config)
    {
        _http = http;

        // Pobieramy baseUrl i token z appsettings.json (sekcja "Canvas")
        var baseUrl = config["Canvas:BaseUrl"]
                      ?? throw new ArgumentNullException("Canvas:BaseUrl");
        _baseUrl = baseUrl.TrimEnd('/') + "/api/v1";

        var token = config["Canvas:Token"]
                    ?? throw new ArgumentNullException("Canvas:Token");
        // dodajemy nagłówek autoryzacji
        _http.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
    }

    // Pobiera listę użytkowników z Canvas
    public async Task<CanvasUser[]> GetUsersAsync()
    {
        var url = $"{_baseUrl}/users";
        var resp = await _http.GetAsync(url);
        if (!resp.IsSuccessStatusCode) return Array.Empty<CanvasUser>();

        using var stream = await resp.Content.ReadAsStreamAsync();
        var users = await JsonSerializer.DeserializeAsync<CanvasUser[]>(stream,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        return users ?? Array.Empty<CanvasUser>();
    }

//    Pobiera konto konto CANVAS uzytkownika
    public async Task<CanvasUser?> GetCurrentUserAsync()
    {
        var url = $"{_baseUrl}/users/self";
        var resp = await _http.GetAsync(url);
        if (!resp.IsSuccessStatusCode) return null;
        using var stream = await resp.Content.ReadAsStreamAsync();
        return await JsonSerializer.DeserializeAsync<CanvasUser>(
            stream,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }


    // Pobiera użytkownika po ID
    public async Task<CanvasUser?> GetUserByIdAsync(int userId)
    {
        var url = $"{_baseUrl}/users/self";
        var resp = await _http.GetAsync(url);
        if (!resp.IsSuccessStatusCode) return null;

        using var stream = await resp.Content.ReadAsStreamAsync();
        var user = await JsonSerializer.DeserializeAsync<CanvasUser>(stream,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        return user;
    }

    // Aktualizuje podstawowe dane użytkownika (np. email)
    public async Task<bool> UpdateUserAsync(CanvasUser user)
    {
        var url = $"{_baseUrl}/users/{user.Id}";
        // Canvas oczekuje obiektu { user: { ... } }
        var payload = new { user = new { email = user.Email } };
        var content = new StringContent(
            JsonSerializer.Serialize(payload),
            System.Text.Encoding.UTF8,
            "application/json"
        );

        var resp = await _http.PutAsync(url, content);
        return resp.IsSuccessStatusCode;
    }

    public async Task<CanvasUser?> CreateUserAsync(int accountId, CanvasUser newUser)
        {
            var payload = new
            {
                user = new
                {
                    name          = newUser.Name,
                    short_name    = newUser.ShortName,
                    sortable_name = newUser.SortableName,
                    email         = newUser.Email
                },
                pseudonym = new
                {
                    unique_id = newUser.LoginId
                }
            };
            var json    = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var resp    = await _http.PostAsync($"{_baseUrl}/accounts/{accountId}/users", content);
            if (!resp.IsSuccessStatusCode) return null;

            using var stream = await resp.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync<CanvasUser>(stream,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
}

// DTO użytkownika w Canvas
public class CanvasUser
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = default!;

    [JsonPropertyName("short_name")]
    public string ShortName { get; set; } = default!;

    [JsonPropertyName("sortable_name")]
    public string SortableName { get; set; } = default!;

    [JsonPropertyName("email")]
    public string Email { get; set; } = default!;

    [JsonPropertyName("login_id")]
    public string LoginId { get; set; } = default!;
}
