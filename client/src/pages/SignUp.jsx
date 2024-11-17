import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import "./SignUp.css";
import edu from "../assets/education.png";
import grad from "../assets/graduation.png";
import emb from "../assets/emblem.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../auth/authslice";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    dispatch(register(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success("Registration successful!");
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const changeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="signup-app-container">
        <div className="signup-left-panel">
          <button type="button" className="signup-back-button">
          <Link to="/" ><ArrowLeft size={20} /></Link>
          </button>
          <div className="signup-sign-in-link">
            Already a member?{" "}
            <Link to="/login" className="signup-sign-in">
              Sign in
            </Link>
          </div>

          <div className="signup-sign-up-form">
            <h1 className="signup-title">Sign Up</h1>

            <label htmlFor="name" className="signup-label">
              <p>
                Name <sup className="signup-text-red-500">*</sup>
              </p>
              <div className="signup-input-group">
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  placeholder="Enter name"
                  onChange={changeHandler}
                  className="signup-input-field"
                />
              </div>
            </label>

            <label htmlFor="email" className="signup-label">
              <p>
                Email <sup className="signup-text-red-500">*</sup>
              </p>
              <div className="signup-input-group">
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  placeholder="Enter email"
                  onChange={changeHandler}
                  className="signup-input-field"
                />
              </div>
            </label>

            <label htmlFor="password" className="signup-label">
              <p>
                Password <sup className="signup-text-red-500">*</sup>
              </p>
              <div className="signup-input-group">
                <input
                  type="password"
                  value={formData.password}
                  name="password"
                  placeholder="••••••"
                  onChange={changeHandler}
                  className="signup-input-field"
                />
              </div>
            </label>

            <label htmlFor="confirmPassword" className="signup-label">
              <p>
                Confirm Password <sup className="signup-text-red-500">*</sup>
              </p>
              <div className="signup-input-group">
                <input
                  type="password"
                  placeholder="Re-Type Password"
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={changeHandler}
                  className="signup-input-field"
                />
              </div>
            </label>

            <button type="submit" className="signup-submit-button">
              Sign Up
            </button>

            <button type="button" className="signup-google">
              <FcGoogle size={20} />
              <p>Sign Up with Google</p>
            </button>
          </div>
        </div>

        <div className="signup-right-panel">
          <div className="signup-container">
            <h2 className="signup-title">Indian Education Symbols</h2>
            <div className="signup-svg-container">
              <svg
                viewBox="0 0 800 450"
                className="signup-svg-content"
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

                {/* Ashoka Chakra (more detailed and faster animation) */}
                <circle cx="80" cy="57.5" r="10" fill="#000080" />
                <circle cx="80" cy="57.5" r="9" fill="#FFFFFF" />
                {[...Array(24)].map((_, i) => (
                  <React.Fragment key={i}>
                    <motion.line
                      x1="80"
                      y1="48.5"
                      x2="80"
                      y2="51.5"
                      stroke="#000080"
                      strokeWidth="0.5"
                      transform={`rotate(${i * 15} 80 57.5)`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.02, duration: 0.2 }}
                    />
                    <motion.path
                      d={`M80,57.5 L${80 + 7 * Math.cos((i * 15 * Math.PI) / 180)
                        },${57.5 + 7 * Math.sin((i * 15 * Math.PI) / 180)}`}
                      fill="none"
                      stroke="#000080"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5 + i * 0.02, duration: 0.3 }}
                    />
                  </React.Fragment>
                ))}

                {/* Iconic Indian Educational Institution (inspired by IIT Delhi) */}
                <rect x="200" y="150" width="400" height="200" fill="#d1d5db" />

                {/* Graduation image */}
                <rect x="250" y="200" width="80" height="100" fill="#f3f4f6" />
                <motion.image
                  href={grad}
                  x="250"
                  y="200"
                  width="80"
                  height="100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                />

                {/* National Emblem of India */}
                <rect x="350" y="200" width="80" height="100" fill="#f3f4f6" />
                <motion.image
                  href={emb}
                  x="350"
                  y="200"
                  width="80"
                  height="100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                />

                {/* Education image */}
                <rect x="450" y="200" width="80" height="100" fill="#f3f4f6" />
                <motion.image
                  href={edu}
                  x="450"
                  y="200"
                  width="80"
                  height="100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                />

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
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
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
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    {item.symbol}
                  </motion.text>
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
            <p className="signup-description">
              This illustration represents the blend of traditional Indian
              educational values with modern learning, showcasing iconic
              institutions and national pride in the context of education.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
