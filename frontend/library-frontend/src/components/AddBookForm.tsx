// src/components/AddBookForm.tsx
import { useEffect, useState } from "react";

interface BookFormData {
  title: string;
  author: string;
  description: string;
}

interface BookToEdit {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface Props {
  onBookAdded: () => void;
  bookToEdit?: BookToEdit | null;
}

export default function AddBookForm({ onBookAdded, bookToEdit }: Props) {
  const [book, setBook] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (bookToEdit) {
      setBook({
        title: bookToEdit.title,
        author: bookToEdit.author,
        description: bookToEdit.description,
      });
    } else {
      setBook({ title: "", author: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [bookToEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title.trim() || !book.author.trim()) {
      alert("Title and Author are required");
      return;
    }

    const token = localStorage.getItem("token");
    
    // Include image data if available
    const bookData = {
      ...book,
      imageUrl: imagePreview || undefined
    };

    if (bookToEdit) {
      await fetch(`http://localhost:5043/books/${bookToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });
    } else {
      await fetch("http://localhost:5043/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });
      // Clear form after adding new book
      setBook({ title: "", author: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
    }

    onBookAdded();
  };

  return (
    <div>
      <h3 className="card-title" style={{ fontSize: "1.5rem", marginBottom: "24px", color: "#1f2937" }}>
        {bookToEdit ? "Edit Book" : "Add New Book"}
      </h3>

      <form className="form" onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: imagePreview ? "1fr 250px" : "1fr", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label>
              <span style={{ fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Title</span>
              <input
                name="title"
                placeholder="Enter book title"
                value={book.title}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  transition: "all 0.2s ease"
                }}
              />
            </label>

            <label>
              <span style={{ fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Author</span>
              <input
                name="author"
                placeholder="Enter author name"
                value={book.author}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  transition: "all 0.2s ease"
                }}
              />
            </label>

            <label>
              <span style={{ fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Description</span>
              <textarea
                name="description"
                placeholder="Enter a short description of the book"
                value={book.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  minHeight: "100px",
                  resize: "vertical",
                  transition: "all 0.2s ease"
                }}
              />
            </label>

            <label>
              <span style={{ fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Book Cover Image</span>
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="bookCoverInput"
                  style={{
                    display: "none"
                  }}
                />
                <label
                  htmlFor="bookCoverInput"
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    backgroundColor: "#f3f4f6",
                    border: "2px dashed #d1d5db",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                    width: "100%",
                    color: "#6b7280",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                    e.currentTarget.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                >
                  {imageFile ? imageFile.name : "Click to upload book cover"}
                </label>
              </div>
            </label>
          </div>

          {imagePreview && (
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: "600", color: "#374151", fontSize: "0.875rem" }}>Preview</span>
              <div style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                border: "3px solid #e5e7eb"
              }}>
                <img 
                  src={imagePreview} 
                  alt="Book cover preview" 
                  style={{
                    width: "200px",
                    height: "280px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                style={{
                  padding: "6px 12px",
                  fontSize: "0.875rem",
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: "24px" }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "10px"
            }}
          >
            {bookToEdit ? "Update Book" : "Add Book"}
          </button>
          {bookToEdit && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => onBookAdded()}
              style={{
                padding: "14px 32px",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "10px"
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
