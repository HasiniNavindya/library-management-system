using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Register SQLite + DbContext here
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// GET all books
app.MapGet("/books", async (LibraryContext db) =>
    await db.Books.ToListAsync());

// GET book by id
app.MapGet("/books/{id}", async (int id, LibraryContext db) =>
{
    var book = await db.Books.FindAsync(id);
    return book is not null ? Results.Ok(book) : Results.NotFound();
});

// POST create new book
app.MapPost("/books", async (Book book, LibraryContext db) =>
{
    // validation
    if (string.IsNullOrWhiteSpace(book.Title) || string.IsNullOrWhiteSpace(book.Author))
        return Results.BadRequest(new { message = "Title and Author are required" });

    db.Books.Add(book);
    await db.SaveChangesAsync();
    return Results.Created($"/books/{book.Id}", book);
});

// PUT update book by id
app.MapPut("/books/{id}", async (int id, Book updatedBook, LibraryContext db) =>
{
    var book = await db.Books.FindAsync(id);

    if (book is null)
        return Results.NotFound();

    if (string.IsNullOrWhiteSpace(updatedBook.Title) || string.IsNullOrWhiteSpace(updatedBook.Author))
        return Results.BadRequest(new { message = "Title and Author are required" });

    book.Title = updatedBook.Title;
    book.Author = updatedBook.Author;
    book.Description = updatedBook.Description;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

// DELETE remove book by id
app.MapDelete("/books/{id}", async (int id, LibraryContext db) =>
{
    var book = await db.Books.FindAsync(id);

    if (book is null)
        return Results.NotFound();

    db.Books.Remove(book);
    await db.SaveChangesAsync();

    return Results.NoContent();
});



app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
