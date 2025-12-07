using Microsoft.EntityFrameworkCore;
using LibraryApi.Models;

namespace LibraryApi.Data;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options)
    {
    }
    public DbSet<Book> Books => Set<Book>();
    public DbSet<User> Users => Set<User>(); 
}