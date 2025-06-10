import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(true);

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut(auth);
        setTimeout(() => {
          navigate("/login");
        }, 1000); // delay for smoother UX
      } catch (error) {
        console.error("Logout error:", error);
        alert("❌ Failed to log out.");
        setLoggingOut(false);
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>{loggingOut ? "Logging out…" : "Redirecting…"}</h2>
    </div>
  );
}
