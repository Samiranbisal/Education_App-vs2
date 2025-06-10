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
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      {type === "register" && (
        <input
          {...register("username", { required: "Username is required" })}
          type="text"
          placeholder="Username"
        />
      )}

      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Min length is 6" },
        })}
        type="password"
        placeholder="Password"
      />
      {type === "register" && (
        <input
          {...register("confirmPassword", {
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
        />
      )}

      {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}

      <button type="submit">{type === "login" ? "Login" : "Register"}</button>
    </form>
  );
}
