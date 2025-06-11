// import { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithPopup,
// } from "firebase/auth";
// import {
//   doc,
//   setDoc,
//   getDoc,
// } from "firebase/firestore";
// import { auth, db, googleProvider } from "../firebase";
// import { useNavigate, Link } from "react-router-dom";
// import AuthForm from "../components/AuthForm";
// import "../styles/Auth.css";

// export default function Register() {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const userCred = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );
//       const user = userCred.user;

//       await updateProfile(user, { displayName: data.username });

//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         username: data.username,
//         email: data.email,
//         createdAt: new Date(),
//         provider: "email",
//       });

//       setSuccess(true);
//       setTimeout(() => {
//         setLoading(false);
//         navigate("/dashboard");
//       }, 1800);
//     } catch (err) {
//       alert(err.message);
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         await setDoc(userRef, {
//           uid: user.uid,
//           username: user.displayName,
//           email: user.email,
//           createdAt: new Date(),
//           provider: "google",
//         });
//       }

//       setSuccess(true);
//       setTimeout(() => {
//         setLoading(false);
//         navigate("/dashboard");
//       }, 1800);
//     } catch (error) {
//       alert("Google login failed: " + error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {(loading || success) && (
//         <div className="loading-overlay">
//           <div className="spinner-container">
//             {!success ? (
//               <>
//                 <div className="spinner"></div>
//                 <p className="loading-text">Creating account…</p>
//               </>
//             ) : (
//               <>
//                 <svg className="checkmark" viewBox="0 0 52 52">
//                   <circle
//                     className="checkmark__circle"
//                     cx="26"
//                     cy="26"
//                     r="25"
//                     fill="none"
//                   />
//                   <path
//                     className="checkmark__check"
//                     fill="none"
//                     d="M14 27l7 7 16-16"
//                   />
//                 </svg>
//                 <p className="loading-text">Account created!</p>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="auth-container">
//         <h2>Register</h2>
//         <AuthForm
//           onSubmit={onSubmit}
//           type="register"
//           disabled={loading || success}
//         />

//         <button
//           className="google-btn"
//           onClick={handleGoogleSignIn}
//           disabled={loading || success}
//         >
//           Continue with Google
//         </button>

//         <div className="auth-links">
//           <p>
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


// --------------------------------------------------------------------------
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!form.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { email, password, username, role } = form;
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        role,
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
          role: "student",
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
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark__check" fill="none" d="M14 27l7 7 16-16" />
                </svg>
                <p className="loading-text">Account created!</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={onSubmit} noValidate>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
            />
            <span onClick={togglePassword} className="toggle-password">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={onChange}
            />
            <span onClick={toggleConfirmPassword} className="toggle-password">
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <select name="role" value={form.role} onChange={onChange}>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}

          <button type="submit" disabled={loading || success}>
            Register
          </button>
        </form>

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
