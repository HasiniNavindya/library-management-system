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

  useEffect(() => {
    if (bookToEdit) {
      setBook({
        title: bookToEdit.title,
        author: bookToEdit.author,
        description: bookToEdit.description,
      });
    } else {
      setBook({ title: "", author: "", description: "" });
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title.trim() || !book.author.trim()) {
      alert("Title and Author are required");
      return;
    }

    if (bookToEdit) {
      await fetch(`http://localhost:5043/books/${bookToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    } else {
      await fetch("http://localhost:5043/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    }

    onBookAdded();
  };

  return (
    <div>
      <h3 className="card-title">
        {bookToEdit ? "Edit Book" : "Add New Book"}
      </h3>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            name="title"
            placeholder="Book title"
            value={book.title}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Author</span>
          <input
            name="author"
            placeholder="Author name"
            value={book.author}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            placeholder="Short description of the book"
            value={book.description}
            onChange={handleChange}
          />
        </label>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" className="btn btn-primary">
            {bookToEdit ? "✓ Update Book" : "+ Add Book"}
          </button>
          {bookToEdit && (
            <button 
              type="button" 
              className="btn btn-cancel"
              onClick={() => onBookAdded()}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
