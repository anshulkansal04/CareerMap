import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './Footer.css'

export default function Footer() {
  return (
    <footer className="nep-footer">
      <div className="container-footer">
        <div className="footer-section">
          <h3 className="footer-logo">Future Fit</h3>
          <p className="footer-description">
            Empowering students through innovative learning and modern educational solutions.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {["Home", " Policy Insights ", "Features", "Testimonials", "About Us"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <p>123 Learning Lane, Edu City</p>
          <p>Email: support@futurefit.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-socials">
            <a href="#" className="social-link">
              <FaFacebookF />
            </a>
            <a href="#" className="social-link">
              <FaTwitter />
            </a>
            <a href="#" className="social-link">
              <FaInstagram />
            </a>
            <a href="#" className="social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Future Fit. All rights reserved.</p>
      </div>
    </footer>
  );
}
