import { useState } from "react";

interface Props {
  onLoginSuccess: () => void;
}

export default function AuthPage({ onLoginSuccess }: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation for signup
    if (mode === "signup") {
      if (!email || !username || !password || !confirmPassword) {
        setError("All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    try {
      const url =
        mode === "login"
          ? "http://localhost:5043/auth/login"
          : "http://localhost:5043/auth/register";

      const body =
        mode === "login"
          ? { username, password }
          : { email, username, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const text = data.message || (mode === "login"
          ? "Invalid username or password"
          : "Registration failed");
        setError(text);
        return;
      }

      if (mode === "signup") {
        setMessage("Account created successfully. You can now log in.");
        setMode("login");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        return;
      }

      // login success
      const data = await res.json();
      localStorage.setItem("token", data.token);
      onLoginSuccess();
    } catch (err) {
      setError("Cannot connect to server. Please make sure the backend is running on http://localhost:5043");
      console.error("Fetch error:", err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 20px 20px",
      background: "transparent"
    }}>
      <div 
        className="card" 
        style={{ 
          maxWidth: 450, 
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}
      >
        <h3 className="card-title" style={{ color: "#1f2937", fontWeight: "700" }}>
          {mode === "login" ? "Login" : "Create Account"}
        </h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            type="button"
            className={`btn ${mode === "login" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setMode("login");
              setError("");
              setMessage("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn ${mode === "signup" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setMode("signup");
              setError("");
              setMessage("");
              setEmail("");
              setUsername("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </label>

          {mode === "signup" && (
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </label>
          )}

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>

          {mode === "signup" && (
            <label>
              <span>Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </label>
          )}

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", marginTop: 4 }}>
              {error}
            </p>
          )}
          {message && (
            <p style={{ color: "green", fontSize: "0.85rem", marginTop: 4 }}>
              {message}
            </p>
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
