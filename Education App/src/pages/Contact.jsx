import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import "./Contact.css";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const serviceID = "service_y4izd9p";
    const templateID = "template_vuis3cj";
    const userID = "lzMD8WsSmTnGO35TX"; // or use `emailjs.sendForm` and remove userID param

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(() => {
        alert("Message sent successfully!");
        reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Your full name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </label>

        <label>
          Email
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="you@friendwaves.com"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </label>

        <label>
          Message
          <textarea
            rows="5"
            {...register("message", { required: "Message is required" })}
            placeholder="Your message"
          />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
