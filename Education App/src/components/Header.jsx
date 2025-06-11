import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "./HeaderFooter.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/dashboard" className="logo">Friends Wave</Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {user ? (
              <>
                {/* <li><Link to="/logout">Logout</Link></li> */}
                <li className="user-info">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="user-avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        verticalAlign: "middle",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#888",
                        color: "#fff",
                        textAlign: "center",
                        lineHeight: "30px",
                        marginRight: "8px",
                        verticalAlign: "middle",
                        fontWeight: "bold",
                      }}
                    >
                      {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                    </span>
                  )}
                  {/* 👤 {user.displayName || user.email} */}
                </li>
                <li><Link to="/logout">Logout</Link></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
