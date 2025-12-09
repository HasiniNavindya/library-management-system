# 📚 Library Management System

A simple full-stack application for managing books in a library.
Users can **create, view, update, and delete** book records.
This project was developed as part of the **Software Engineering Internship Assignment**.

---

## ✨ Features

✔ Add new books
✔ View all books
✔ Edit existing books
✔ Delete books
✔ SQLite database with Entity Framework
✔ Responsive React UI
✔ Clean and modern interface

> Optional: Authentication

---

## 🛠️ Tech Stack

### 🔧 Backend

* ASP.NET Core (.NET 8)
* C#
* Entity Framework Core
* SQLite

### 🎨 Frontend

* React
* TypeScript
* CSS

---

## 📁 Project Structure

```
library-management-system/
│
├── backend/
│   └── LibraryApi/
│       ├── Controllers
│       ├── Data
│       ├── Models
│       └── library.db
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.tsx
│       └── index.tsx
│
└── README.md
```

---

## 🚀 How to Run the Application

### 🖥️ Backend (API)

1. Open terminal in:

```
backend/LibraryApi
```

2. Run migrations and start:

```
dotnet restore
dotnet ef database update
dotnet run
```

Backend runs at:
👉 [http://localhost:5043](http://localhost:5043)

---

### 🌐 Frontend (React)

1. Open terminal in:

```
frontend
```

2. Install and start:

```
npm install
npm start
```

Frontend runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔗 API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/books`         | Get all books                |
| GET    | `/books/{id}`    | Get a book by ID             |
| POST   | `/books`         | Add new book                 |
| PUT    | `/books/{id}`    | Update a book                |
| DELETE | `/books/{id}`    | Delete a book                |
| POST   | `/auth/register` | Create new user              |
| POST   | `/auth/login`    |Authenticate and return JWT   |

---

## 🧪 Validation & Error Handling

* Required fields: **Title & Author**
* Handles not found responses (`404`)
* Returns proper HTTP status codes

---

## 📄 Report

✔ A detailed project report is included:

```
/report/LibraryManagementSystem_Report.pdf
```

---

## 👩‍💻 Author

**Hasini Navindya**
Software Engineering Intern Candidate

---

## ⭐ Conclusion

This project demonstrates:

* Ability to work independently
* Good understanding of **.NET, React & SQLite**
* Clean code structure
* Full working CRUD application

---

