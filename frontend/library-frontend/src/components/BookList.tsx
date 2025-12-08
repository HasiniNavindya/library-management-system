// src/components/BookList.tsx
import { useEffect, useState } from "react";
import AddBookForm from "./AddBookForm";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const refreshBooks = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5043/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  const handleFormFinished = () => {
    setSelectedBook(null);
    refreshBooks();
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5043/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    refreshBooks();
  };

  return (
    <div className="page">
      {/* top grid: form + (later we can add summary) */}
      <div className="grid">
        <div className="card">
          <AddBookForm
            onBookAdded={handleFormFinished}
            bookToEdit={selectedBook}
          />
        </div>
      </div>

      <div className="card table-card">
        <h3 className="card-title">All Books</h3>
        {books.length === 0 ? (
          <p className="empty-text">No books found. Add your first book above.</p>
        ) : (
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th style={{ width: "200px" }}>Author</th>
                <th>Description</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td data-label="Title"><strong>{book.title}</strong></td>
                  <td data-label="Author">{book.author}</td>
                  <td data-label="Description">{book.description || <em style={{ color: '#9ca3af' }}>No description</em>}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditClick(book)}
                      title="Edit book"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(book.id)}
                      title="Delete book"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
