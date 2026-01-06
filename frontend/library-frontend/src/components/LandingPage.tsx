interface Props {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <div 
      style={{ 
        minHeight: "100vh",
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflow: "hidden",
        margin: 0
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/Landing1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))",
          zIndex: 0
        }}
      />
      
      {/* Navigation Bar */}
      <nav 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <div style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#ffffff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
        }}>
          Library Management
        </div>
        
        <div style={{ display: "flex", gap: "15px" }}>
          <button 
            className="btn btn-secondary"
            onClick={onGetStarted}
            style={{
              padding: "10px 30px",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Login
          </button>
          <button 
            className="btn btn-primary"
            onClick={onGetStarted}
            style={{
              padding: "10px 30px",
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>
      
      <div 
        style={{ 
          maxWidth: 650, 
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "20px",
          padding: "60px 50px",
          animation: "fadeIn 0.8s ease-in-out"
        }}
      >
        <h1 style={{ 
          fontSize: "3rem", 
          marginBottom: "1.5rem", 
          color: "#ffffff",
          fontWeight: "800",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          letterSpacing: "-0.5px"
        }}>
          Welcome to Library Management
        </h1>
        <p style={{ 
          fontSize: "1.25rem", 
          color: "rgba(255, 255, 255, 0.95)", 
          marginBottom: "2.5rem", 
          lineHeight: 1.7,
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.4)"
        }}>
          Organize and manage your book collection with ease. 
          Track your books, add new titles, and keep everything in one place.
        </p>
        
        <button 
          className="btn btn-primary" 
          onClick={onGetStarted}
          style={{ 
            fontSize: "1.2rem", 
            padding: "16px 60px",
            fontWeight: "600",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
