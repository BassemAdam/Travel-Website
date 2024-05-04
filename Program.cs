using System.Data;
using Microsoft.Data.Sqlite;
using Travel_Website.Models;
using Dapper;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IDbConnection>(b => new SqliteConnection("Data Source=./wwwroot/Database/places.db"));

var app = builder.Build();
app.UseStaticFiles();



#region Places Controller 

app.MapGet("/places/all", async (IDbConnection db) =>
{
    var places = await db.QueryAsync<Place>("SELECT * FROM Places;");
    return Results.Ok(places);
});

app.MapGet("/places/names", async (IDbConnection db) =>
{
    var places = await db.QueryAsync<Place>("SELECT Id, Name FROM Places;");
    return Results.Ok(places);
});

app.MapPost("/places", async (HttpRequest req, IDbConnection db) =>
{
    if (req.HasFormContentType)
    {
        var form = await req.ReadFormAsync();
        var image = form.Files["image"];
        var name = form["name"];

        // Convert the image to a byte array
        using var memoryStream = new MemoryStream();
        await image.CopyToAsync(memoryStream);
        var imageBytes = memoryStream.ToArray();

        // Create a new Place object
        var place = new Place { Name = name, Image = imageBytes };

        // Insert the place into the database
        var sql = "INSERT INTO Places (Name, Image) VALUES (@Name, @Image);";
        var rowsAffected = await db.ExecuteAsync(sql, place);

        return rowsAffected > 0 ? Results.Ok("Name and image of the place successfully added to database") : Results.BadRequest();
    }
    else
    {
        return Results.BadRequest("Request must have a form content type.");
    }
}).DisableAntiforgery();

app.MapDelete("/places/{id}", async (int id, IDbConnection db) =>
{
    var sql = "DELETE FROM Places WHERE Id = @Id;";
    var rowsAffected = await db.ExecuteAsync(sql, new { Id = id });

    return rowsAffected > 0 ? Results.Ok("Successfuly deleted the place") : Results.NotFound();
});

app.MapPut("/places/{id}", async (int id, Place place, IDbConnection db) =>
{
    var sql = "UPDATE Places SET Name = @Name, Image = @Image WHERE Id = @Id;";
    var rowsAffected = await db.ExecuteAsync(sql, new { Id = id, Name = place.Name, Image = place.Image });

    return rowsAffected > 0 ? Results.Ok() : Results.NotFound();
});
#endregion


app.Run();

