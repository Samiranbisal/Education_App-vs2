// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./HeaderFooter.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>About Friends Wave</h4>
          <p>
            Friends Wave is a modern platform for online education, empowering
            students and teachers with rich tools and courses.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: Friends@Wave.com</p>
          <p>Phone: +91 93824 12822</p>
          <p>Address: Kolkata, West Bengal, India</p>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Friends Wave. All rights reserved.</p>
      </div>
    </footer>
  );
}
