// src/App.tsx
import "./App.css";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        
        <div>
          <h1>Library Books</h1>
          <p>Manage your books easily – add, edit and delete records.</p>
        </div>
      </header>

      <main>
        <BookList />
      </main>
    </div>
  );
}

export default App;
