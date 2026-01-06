import "./App.css";
import { useState } from "react";
import BookList from "./components/BookList";
import AuthPage from "./components/AuthPage";
import LandingPage from "./components/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowAuth(false);
  };

  const renderContent = () => {
    if (isLoggedIn) {
      return <BookList />;
    }
    if (showAuth) {
      return <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />;
    }
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  };

  return (
    <div className="app" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/Landing1.webp)`
    }}>
      {(isLoggedIn || showAuth) && (
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
      )}

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
