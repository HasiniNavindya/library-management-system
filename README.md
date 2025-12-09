# 📚 Library Management System

A full-stack web application to manage library books.

Users can **create, view, update, and delete** book records.  
Backend is built with .NET + SQLite + Entity Framework Core.  
Frontend is built with React + TypeScript for a dynamic and responsive UI.

---

## ✨ Features

- Add new books  
- View list of existing books  
- Edit / update book details  
- Delete book records  
- Persistent storage using SQLite  
- RESTful API endpoints for Books  
- Modern web UI using React  

*(Additional Feature : User authentication via JWT.)*

---

## 🛠️ Tech Stack

**Backend**  
- .NET 8  
- C#  
- Entity Framework Core  
- SQLite  

**Frontend**  
- React  
- TypeScript  
- CSS / HTML  

---

## 📁 Project Structure

```

library-management-system/
│
├── backend/
│   └── LibraryApi/        # .NET Web API project
│       ├── Models/         # Book model (and optionally User if auth added)
│       ├── Data/           # DbContext + migrations
│       └── Program.cs      # Startup + endpoint routing
│
├── frontend/               # React + TypeScript app
│   └── src/
│       ├── components/     # BookList, AddBookForm, (Auth components)
│       ├── App.tsx
│       └── index.tsx
│
└── README.md               # Project description and instructions

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
cd frontend
npm install
npm start
```

The frontend UI will run at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 API Endpoints

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/books`      | Get all books       |
| GET    | `/books/{id}` | Get a book by ID    |
| POST   | `/books`      | Create a new book   |
| PUT    | `/books/{id}` | Update a book by ID |
| DELETE | `/books/{id}` | Delete a book by ID |

*(authentication Endpoints)*

| Method  | Endpoint           | Description              |
| ------  | ------------------ | ------------------------ |
| POST    | `/auth/register`   | Register a new user      |
| POST    | `/auth/login`      | Login & get JWT token    |

---

## 👩‍💻 Author

**Hasini Navindya** — Software Engineering Intern Candidate at Expernetic LLC

---

