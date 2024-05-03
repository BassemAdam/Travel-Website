using System.Data;
using Microsoft.Data.Sqlite;
using Travel_Website.Models;
using Dapper;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IDbConnection>(b => new SqliteConnection("Data Source=Database/places.db"));
var app = builder.Build();
app.UseStaticFiles();

//app.UseHttpsRedirection();

#region Places Controller 

app.MapGet("/places", async (IDbConnection db) =>
{
    var sql = "SELECT * FROM Places;";
    var places = await db.QueryAsync<Place>(sql);

    return Results.Ok(places);
});

app.MapPost("/places", async (Place place, IDbConnection db) =>
{
    var sql = "INSERT INTO Places (Name, Image) VALUES (@Name, @Image);";
    var rowsAffected = await db.ExecuteAsync(sql, place);

    return rowsAffected > 0 ? Results.Ok() : Results.BadRequest();
});

app.MapDelete("/places/{id}", async (int id, IDbConnection db) =>
{
    var sql = "DELETE FROM Places WHERE Id = @Id;";
    var rowsAffected = await db.ExecuteAsync(sql, new { Id = id });

    return rowsAffected > 0 ? Results.Ok() : Results.NotFound();
});

app.MapPut("/places/{id}", async (int id, Place place, IDbConnection db) =>
{
    var sql = "UPDATE Places SET Name = @Name, Image = @Image WHERE Id = @Id;";
    var rowsAffected = await db.ExecuteAsync(sql, new { Id = id, Name = place.Name, Image = place.Image });

    return rowsAffected > 0 ? Results.Ok() : Results.NotFound();
});
#endregion


app.Run();

