import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (name.trim() === "") {
      toast.error("Name cannot be empty");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      toast.error(
        "Password must include at least one number and one special character"
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const changeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    toast.success("Account Created");
    console.log("Printing the entire form data:");
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="app-container">
        <div className="left-panel">
          <button type="button" className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="sign-in-link">
            Already a member?{" "}
            <a href="#" className="sign-in">
              Sign in
            </a>
          </div>

          <div className="sign-up-form">
            <h1 className="title">Sign Up</h1>
            <p className="subtitle">Secure Your Communications with Easymail</p>

            <label htmlFor="name" className="label">
              <p>
                Name <sup className="text-red-500">*</sup>
              </p>
              <div className="input-group">
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  placeholder="Enter name"
                  onChange={changeHandler}
                  className="input-field"
                />
              </div>
            </label>

            <label htmlFor="email" className="label">
              <p>
                Email <sup className="text-red-500">*</sup>
              </p>
              <div className="input-group">
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  placeholder="Enter email"
                  onChange={changeHandler}
                  className="input-field"
                />
              </div>
            </label>

            <label htmlFor="password" className="label">
              <p>
                Password <sup className="text-red-500">*</sup>
              </p>
              <div className="input-group">
                <input
                  type="password"
                  value={formData.password}
                  name="password"
                  placeholder="••••••"
                  onChange={changeHandler}
                  className="input-field"
                />
              </div>
            </label>

            <label htmlFor="confirmPassword" className="label">
              <p>
                Confirm Password <sup className="text-red-500">*</sup>
              </p>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Re-Type Password"
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={changeHandler}
                  className="input-field"
                />
              </div>
            </label>

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            <button className="google">
              <FcGoogle size={20} />
              <p>Sign Up with Google</p>
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="container">
            <h2 className="title">Indian Education Symbols</h2>
            <div className="svg-container">
              <svg
                viewBox="0 0 800 450"
                className="svg-content"
                aria-labelledby="indian-education-title indian-education-desc"
                role="img"
              >
                <title id="indian-education-title">
                  Indian Education Symbols
                </title>
                <desc id="indian-education-desc">
                  An illustration showcasing Indian education symbols, including
                  students in front of iconic Indian educational institutions,
                  blended with the Indian flag and various symbols of education.
                </desc>

                {/* Sky background */}
                <rect x="0" y="0" width="800" height="450" fill="#e0f2fe" />

                {/* Sun */}
                <motion.circle
                  cx="700"
                  cy="80"
                  r="40"
                  fill="#fbbf24"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                />

                {/* Indian Flag */}
                <rect x="20" y="20" width="120" height="25" fill="#FF9933" />
                <rect x="20" y="45" width="120" height="25" fill="#FFFFFF" />
                <rect x="20" y="70" width="120" height="25" fill="#138808" />
                <circle cx="80" cy="57.5" r="10" fill="#000080" />
                <motion.path
                  d="M80 47.5 L82 67.5 L78 67.5 Z"
                  fill="#000080"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                />

                {/* Iconic Indian Educational Institution (inspired by IIT Delhi) */}
                <rect x="200" y="150" width="400" height="200" fill="#d1d5db" />
                <rect x="250" y="200" width="80" height="100" fill="#f3f4f6" />
                <rect x="350" y="200" width="80" height="100" fill="#f3f4f6" />
                <rect x="450" y="200" width="80" height="100" fill="#f3f4f6" />
                <path d="M200 150 L400 50 L600 150" fill="#ef4444" />
                <rect x="380" y="300" width="40" height="50" fill="#a78bfa" />

                {/* Students */}
                {[
                  { x: 300, color: "#fcd34d" },
                  { x: 350, color: "#a78bfa" },
                  { x: 400, color: "#34d399" },
                  { x: 450, color: "#f472b6" },
                  { x: 500, color: "#60a5fa" },
                ].map((student, index) => (
                  <motion.g
                    key={index}
                    initial={{ y: 450 }}
                    animate={{ y: 380 }}
                    transition={{
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 50,
                    }}
                  >
                    <circle cx={student.x} cy={0} r="20" fill="#fef3c7" />
                    <rect
                      x={student.x - 15}
                      y={20}
                      width="30"
                      height="40"
                      fill={student.color}
                      rx="5"
                      ry="5"
                    />
                  </motion.g>
                ))}

                {/* Educational Symbols */}
                {[
                  { symbol: "🎓", x: 100, y: 150 },
                  { symbol: "📚", x: 650, y: 200 },
                  { symbol: "🔬", x: 720, y: 300 },
                  { symbol: "🖥️", x: 150, y: 250 },
                  { symbol: "🧮", x: 700, y: 150 },
                ].map((item, index) => (
                  <motion.text
                    key={index}
                    x={item.x}
                    y={item.y}
                    fontSize="24"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    {item.symbol}
                  </motion.text>
                ))}

                {/* Ashoka Chakra (simplified) */}
                <circle
                  cx="80"
                  cy="57.5"
                  r="12"
                  fill="none"
                  stroke="#000080"
                  strokeWidth="1"
                />
                {[...Array(24)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="80"
                    y1="45.5"
                    x2="80"
                    y2="51.5"
                    stroke="#000080"
                    strokeWidth="1"
                    transform={`rotate(${i * 15}, 80, 57.5)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + i * 0.05 }}
                  />
                ))}

                {/* Sanskrit Shloka */}
                <text
                  x="250"
                  y="430"
                  fontSize="12"
                  fill="#1e40af"
                  fontStyle="italic"
                >
                  "विद्या धनं सर्व धनं प्रधानम्" (Knowledge is the supreme
                  wealth)
                </text>
              </svg>
            </div>
            <p className="description">
              This illustration represents the blend of traditional Indian
              educational values with modern learning, showcasing iconic
              institutions and national pride in the context of education.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
