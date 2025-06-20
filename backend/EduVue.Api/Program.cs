using Dapper;
using Npgsql;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient<CanvasService>();

var connectionString = builder.Configuration.GetConnectionString("Default")
                        ?? "Host=db;Port=5432;Username=postgres;Password=postgres;Database=eduvue";

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapGet("/courses", async () =>
{
    await using var conn = new NpgsqlConnection(connectionString);
    var courses = await conn.QueryAsync<Course>("SELECT id, nazwa, dlugosc_trwania, sugerowany_przedzial_wiekowy, szczegoly FROM courses");
    return Results.Json(courses);
});

//Pobranie wszystkich uzytkownikow
app.MapGet("/canvas/users", async (CanvasService canvas) =>
{
    var users = await canvas.GetUsersAsync();
    return Results.Json(users);
});

//Pobranie informacji o koncie uzytkownika
app.MapGet("/canvas/user/self", async (CanvasService canvas) =>
{
    var user = await canvas.GetCurrentUserAsync();
    return user is not null
        ? Results.Ok(user)
        : Results.NotFound("Current Canvas user not found.");
});

//Pobranie uzytownika
app.MapGet("/canvas/user/{id:int}", async (CanvasService canvas, int id) =>
{
    var user = await canvas.GetUserByIdAsync(id);
    return user is not null
        ? Results.Ok(user)
        : Results.NotFound($"Canvas user with ID {id} not found.");
});

//Dodanie uzytkownika
app.MapPost("/canvas/user", async (CanvasService canvas, CanvasUser data) =>
{
    // zakładam, że accountId masz w konfiguracji lub hard-kodujesz na 1
    var accountId = 1;
    var created = await canvas.CreateUserAsync(accountId, data);
    return created is not null
        ? Results.Created($"/canvas/user/{created.Id}", created)
        : Results.BadRequest("Nie udało się utworzyć użytkownika w Canvas.");
});

// Aktualizacja uzytkownika
app.MapPut("/canvas/user", async (CanvasService canvas, CanvasUser updated) =>
{
    var success = await canvas.UpdateUserAsync(updated);
    return success
        ? Results.NoContent()
        : Results.BadRequest("Canvas user update failed.");
});



app.Run();

// DTO kursu
public record Course(
    int Id,
    string Nazwa,
    string Dlugosc_trwania,
    string Sugerowany_przedzial_wiekowy,
    string Szczegoly
);
