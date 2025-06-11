// import { useForm } from "react-hook-form";
// import "./../styles/Auth.css";

// export default function AuthForm({ onSubmit, type }) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const password = watch("password");

//   return (
//     <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
//       {type === "register" && (
//         <input
//           {...register("username", { required: "Username is required" })}
//           type="text"
//           placeholder="Username"
//         />
//       )}

//       <input
//         {...register("email", { required: "Email is required" })}
//         type="email"
//         placeholder="Email"
//       />
//       <input
//         {...register("password", {
//           required: "Password is required",
//           minLength: { value: 6, message: "Min length is 6" },
//         })}
//         type="password"
//         placeholder="Password"
//       />
//       {type === "register" && (
//         <input
//           {...register("confirmPassword", {
//             validate: (value) => value === password || "Passwords do not match",
//           })}
//           type="password"
//           placeholder="Confirm Password"
//         />
//       )}

//       {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
//       {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
//       {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
//       {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}

//       <button type="submit">{type === "login" ? "Login" : "Register"}</button>
//     </form>
//   );
// }


// -----------------------------------------------------------

import { useForm } from "react-hook-form";
import "./../styles/Auth.css";

export default function AuthForm({ onSubmit, type }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {type === "register" && (
        <>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            type="text"
            placeholder="Username"
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <select
            {...register("role", { required: "Role is required" })}
            defaultValue=""
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <p className="error">{errors.role.message}</p>}
        </>
      )}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email format",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      {type === "register" && (
        <>
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </>
      )}

      <button type="submit">
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
