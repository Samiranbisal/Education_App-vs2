import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import "../styles/Auth.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCred.user;

      await updateProfile(user, { displayName: data.username });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: data.username,
        email: data.email,
        createdAt: new Date(),
        provider: "email",
      });

      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1800);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          createdAt: new Date(),
          provider: "google",
        });
      }

      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1800);
    } catch (error) {
      alert("Google login failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {(loading || success) && (
        <div className="loading-overlay">
          <div className="spinner-container">
            {!success ? (
              <>
                <div className="spinner"></div>
                <p className="loading-text">Creating account…</p>
              </>
            ) : (
              <>
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14 27l7 7 16-16"
                  />
                </svg>
                <p className="loading-text">Account created!</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="auth-container">
        <h2>Register</h2>
        <AuthForm
          onSubmit={onSubmit}
          type="register"
          disabled={loading || success}
        />

        <button
          className="google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading || success}
        >
          Continue with Google
        </button>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
