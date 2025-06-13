using Dapper;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);
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

app.Run();

record Course(int Id, string Nazwa, string Dlugosc_trwania, string Sugerowany_przedzial_wiekowy, string Szczegoly);
