import "./App.css";
import { useState } from "react";
import BookList from "./components/BookList";
import AuthPage from "./components/AuthPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Library Books</h1>
          <p>Manage your books – with login and registration.</p>
        </div>
        {isLoggedIn && (
          <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <main>
        {isLoggedIn ? (
          <BookList />
        ) : (
          <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </main>
    </div>
  );
}

export default App;
