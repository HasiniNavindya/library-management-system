using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using LibraryApi.Models;
using LibraryApi.Data;
using LibraryApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["JwtKey"] ?? "super_secret_key_12345"; // demo key
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});
builder.Services.AddAuthorization();

// Add services to the container.
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register SQLite + DbContext here
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db"));

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS
app.UseCors("AllowFrontend");

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

// REGISTER (Sign Up)
app.MapPost("/auth/register", async (LoginRequest request, LibraryContext db) =>
{
    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        return Results.BadRequest(new { message = "Username and password are required" });

    var existing = await db.Users
        .FirstOrDefaultAsync(u => u.Username == request.Username);

    if (existing is not null)
        return Results.BadRequest(new { message = "Username already exists" });

    var user = new User
    {
        Username = request.Username,
        PasswordHash = PasswordHelper.HashPassword(request.Password)
    };

    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Ok(new { message = "User registered successfully" });
});

// LOGIN
app.MapPost("/auth/login", async (LoginRequest request, LibraryContext db) =>
{
    var user = await db.Users
        .FirstOrDefaultAsync(u => u.Username == request.Username);

    if (user is null || !PasswordHelper.VerifyPassword(request.Password, user.PasswordHash))
    {
        return Results.Unauthorized();
    }

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
    };

    var key = new SymmetricSecurityKey(keyBytes);
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.UtcNow.AddHours(1),
        signingCredentials: creds);

    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

    return Results.Ok(new { token = tokenString });
});


// GET all books
app.MapGet("/books", async (LibraryContext db) =>
    await db.Books.ToListAsync())
    .RequireAuthorization();

// GET book by id
app.MapGet("/books/{id}", async (int id, LibraryContext db) =>
{
    var book = await db.Books.FindAsync(id);
    return book is not null ? Results.Ok(book) : Results.NotFound();
})
.RequireAuthorization();

// POST create new book
app.MapPost("/books", async (Book book, LibraryContext db) =>
{
    // validation
    if (string.IsNullOrWhiteSpace(book.Title) || string.IsNullOrWhiteSpace(book.Author))
        return Results.BadRequest(new { message = "Title and Author are required" });

    db.Books.Add(book);
    await db.SaveChangesAsync();
    return Results.Created($"/books/{book.Id}", book);
})
.RequireAuthorization();

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
})
.RequireAuthorization();

// DELETE remove book by id
app.MapDelete("/books/{id}", async (int id, LibraryContext db) =>
{
    var book = await db.Books.FindAsync(id);

    if (book is null)
        return Results.NotFound();

    db.Books.Remove(book);
    await db.SaveChangesAsync();

    return Results.NoContent();
})
.RequireAuthorization();



app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
