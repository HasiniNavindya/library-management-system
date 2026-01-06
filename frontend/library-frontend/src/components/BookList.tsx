// src/components/BookList.tsx
import { useEffect, useState } from "react";
import AddBookForm from "./AddBookForm";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentView, setCurrentView] = useState<"add" | "list">("list");

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
    setCurrentView("list");
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setCurrentView("add");
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
      {/* Tab Navigation */}
      <div style={{ 
        display: "flex", 
        gap: "12px", 
        marginBottom: "24px",
        justifyContent: "flex-start"
      }}>
        <button
          className={`btn ${currentView === "add" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setCurrentView("add")}
          style={{
            padding: "12px 32px",
            fontSize: "1rem",
            fontWeight: "600",
            minWidth: "150px",
            backgroundColor: currentView === "add" ? "#e6912a" : "rgba(255, 255, 255, 0.2)",
            color: currentView === "add" ? "white" : "#1f2937",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}
        >
          Add Book
        </button>
        <button
          className={`btn ${currentView === "list" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            setCurrentView("list");
            setSelectedBook(null);
          }}
          style={{
            padding: "12px 32px",
            fontSize: "1rem",
            fontWeight: "600",
            minWidth: "150px",
            backgroundColor: currentView === "list" ? "#e6912a" : "rgba(255, 255, 255, 0.2)",
            color: currentView === "list" ? "white" : "#1f2937",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}
        >
          All Books
        </button>
      </div>

      {/* Add Book View */}
      {currentView === "add" && (
        <div className="card" style={{ maxWidth: "100%", margin: "0" }}>
          <AddBookForm
            onBookAdded={handleFormFinished}
            bookToEdit={selectedBook}
          />
        </div>
      )}

      {/* All Books View */}
      {currentView === "list" && (
        <div style={{ 
          maxWidth: "100%", 
          margin: "0",
          padding: "24px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "700", 
            color: "#1f2937", 
            marginBottom: "20px",
            borderBottom: "3px solid #e6912a",
            paddingBottom: "10px"
          }}>
            All Books
          </h3>
          {books.length === 0 ? (
            <p className="empty-text" style={{ textAlign: "center", color: "#6b7280", fontSize: "1.1rem", padding: "40px" }}>
              No books found. Add your first book above.
            </p>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "18px" 
            }}>
              {books.map((book) => (
                <div 
                  key={book.id}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    padding: "14px",
                    border: "1px solid rgba(230, 145, 42, 0.3)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(230, 145, 42, 0.25)";
                    e.currentTarget.style.borderColor = "rgba(230, 145, 42, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(230, 145, 42, 0.25)";
                  }}
                >
                  {/* Book Image - Top */}
                  <div style={{
                    width: "100%",
                    height: "280px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    backgroundColor: "#f9fafb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid rgba(230, 145, 42, 0.3)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                  }}>
                    {book.imageUrl ? (
                      <img 
                        src={book.imageUrl} 
                        alt={book.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    ) : (
                      <div style={{
                        textAlign: "center",
                        color: "#d1d5db",
                        fontSize: "4rem"
                      }}>
                        📖
                      </div>
                    )}
                  </div>

                  {/* Book Details - Bottom */}
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "8px",
                    flex: 1
                  }}>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: "1.1rem", 
                      fontWeight: "700",
                      color: "#1f2937",
                      lineHeight: "1.3",
                      minHeight: "40px"
                    }}>
                      {book.title}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "0.9rem", 
                      color: "#e6912a",
                      fontWeight: "600"
                    }}>
                      by {book.author}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "0.85rem", 
                      color: "#4b5563",
                      lineHeight: "1.5",
                      flex: 1,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {book.description || <em style={{ color: '#9ca3af' }}>No description available</em>}
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditClick(book)}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          backgroundColor: "#e6912a",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 8px rgba(230, 145, 42, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#d17a1a";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(230, 145, 42, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#e6912a";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(230, 145, 42, 0.3)";
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(book.id)}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          backgroundColor: "#8b4513",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 8px rgba(139, 69, 19, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#6d3410";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 69, 19, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#8b4513";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(139, 69, 19, 0.3)";
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
