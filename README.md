# 📚 Library Management System

A full-stack web application to manage library books.

Users can **create, view, update, and delete** book records.  
Backend is built with .NET + SQLite + Entity Framework Core.  
Frontend is built with React + TypeScript for a dynamic and responsive UI.

---

## ✨ Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Landing Page**: Beautiful welcome page for new visitors
- **Book Management**:
  - Add new books with title, author, ISBN, and cover image URLs
  - View all books in an organized list with cover images
  - Edit and update book details
  - Delete book records
- **Book Images**: Display book cover images using image URLs
- **User-Specific Books**: Each user can manage their own book collection
- **Persistent Storage**: SQLite database with Entity Framework Core
- **RESTful API**: Clean API endpoints for all operations
- **Modern UI**: Responsive React interface with TypeScript

---

## 🛠️ Tech Stack

**Backend**  
- .NET 10.0  
- C#  
- Entity Framework Core  
- SQLite  
- JWT Authentication

**Frontend**  
- React 18  
- TypeScript  
- CSS3 / HTML5  
- Responsive Design  

---

## 📁 Project Structure

```

library-management-system/
│
├── backend/
│   └── LibraryApi/           # .NET Web API project
│       ├── Models/            # Book, User, LoginRequest models
│       ├── Data/              # DbContext + migrations
│       ├── Services/          # PasswordHelper for authentication
│       ├── Migrations/        # Database migrations
│       └── Program.cs         # Startup + endpoint routing + JWT config
│
├── frontend/
│   └── library-frontend/     # React + TypeScript app
│       ├── public/            # Static assets (images, index.html)
│       └── src/
│           ├── components/    # LandingPage, BookList, AddBookForm, AuthPage
│           ├── App.tsx        # Main application component
│           └── index.tsx      # Entry point
│
└── README.md                  # Project documentation

````

---

## 🚀 Getting Started — Running Locally

### Backend

```bash
cd backend/LibraryApi
dotnet restore
dotnet ef database update
dotnet run
````

The backend server will run at: **[http://localhost:5043](http://localhost:5043)**

### Frontend

Open a new terminal:

```bash
cd frontend/library-frontend
npm install
npm start
```

The frontend UI will run at: **[http://localhost:3000](http://localhost:3000)**

> **Note**: Make sure the backend is running before starting the frontend to enable full functionality.

---

## 🔗 API Endpoints

### Books

| Method | Endpoint      | Description         | Auth Required |
| ------ | ------------- | ------------------- | ------------- |
| GET    | `/books`      | Get all books       | Yes           |
| GET    | `/books/{id}` | Get a book by ID    | Yes           |
| POST   | `/books`      | Create a new book   | Yes           |
| PUT    | `/books/{id}` | Update a book by ID | Yes           |
| DELETE | `/books/{id}` | Delete a book by ID | Yes           |

**Book Model**:
```json
{
  "id": 1,
  "title": "Sample Book",
  "author": "John Doe",
  "isbn": "978-1234567890",
  "imageUrl": "https://example.com/cover.jpg",
  "userId": 1
}
```

### Authentication

| Method  | Endpoint           | Description              | Auth Required |
| ------  | ------------------ | ------------------------ | ------------- |
| POST    | `/auth/register`   | Register a new user      | No            |
| POST    | `/auth/login`      | Login & get JWT token    | No            |

**Register/Login Request**:
```json
{
  "username": "user@example.com",
  "password": "securepassword"
}
```

**Login Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "name": "John Doe",
  "email": "user@example.com"
}
```

---


