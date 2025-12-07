namespace LibraryApi.Models;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    // stored as hashed password
    public string PasswordHash { get; set; } = string.Empty;
}
