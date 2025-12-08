import { useState } from "react";

interface Props {
  onLoginSuccess: () => void;
}

export default function AuthPage({ onLoginSuccess }: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
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
      if (!name || !email || !username || !password || !confirmPassword) {
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
          : { name, email, username, password };

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
        setName("");
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
    <div className="page">
      <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
        <h3 className="card-title">
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
              setName("");
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
          {mode === "signup" && (
            <>
              <label>
                <span>Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </label>
            </>
          )}

          <label>
            <span>Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </label>

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
