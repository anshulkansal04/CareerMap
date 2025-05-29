import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './Footer.css'

export default function Footer() {
  return (
    <footer className="nep-footer">
      <div className="container-footer">
        <div className="footer-section footer-brand">
          <h3 className="footer-logo">NEP Future Fit</h3>
          <p className="footer-description">
            Transforming education through NEP 2020 guidelines. Comprehensive career counselling for students.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            { [
                { name: "Home", path: "/" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "College Prediction", path: "/collegeprediction" },
                { name: "Who We Are", path: "/who-we-are" },
                { name: "Login", path: "/login" },
                { name: "Sign Up", path: "/signup" }
              ].map((item) => (
              <li key={item.name}>
                <a href={item.path}>{item.name}</a>
              </li>
            )) }
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact & Follow</h4>
          <div className="footer-contact">
            <p><span className="contact-label">Email:</span> counsellor@nepfuturefit.edu</p>
            <p><span className="contact-label">Helpline:</span> 1800-NEP-HELP</p>
            <p><span className="contact-label">Hours:</span> Mon-Sat 9AM-7PM</p>
          </div>
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
        <div className="footer-bottom-content">
          <p>&copy; 2024 NEP Future Fit. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            {/* <a href="#nep">NEP 2020 Compliance</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
