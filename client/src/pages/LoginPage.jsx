import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../auth/authslice";
import "./LoginPage.css";

export default function LoginPage() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const educationalQuotes = [
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.", author: "Martin Luther King Jr." },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % educationalQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

  const { email, password } = formData;
  const validateForm = () => {
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
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
    toast.success("Login Successful");
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="login-app-container">
        <div className="login-left-panel">
          <button type="button" className="login-back-button">
            <Link to="/" ><ArrowLeft size={20} /></Link>
          </button>
          <div className="login-sign-up-link">
            Not a member?{" "}
            {/* <a href="#" className="login-sign-up">
              Sign up
            </a> */}
            <Link to="/signup" className="login-sign-up">
              Sign up
            </Link>
          </div>

          <div className="login-login-form">
            <h1 className="login-title">Login</h1>

            <label htmlFor="email" className="login-label">
              <p>
                Email <sup className="login-text-red-500">*</sup>
              </p>
              <div className="login-input-group">
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  placeholder="Enter email"
                  onChange={changeHandler}
                  className="login-input-field"
                />
              </div>
            </label>

            <label htmlFor="password" className="login-label">
              <p>
                Password <sup className="login-text-red-500">*</sup>
              </p>
              <div className="login-input-group">
                <input
                  type="password"
                  value={formData.password}
                  name="password"
                  placeholder="••••••"
                  onChange={changeHandler}
                  className="login-input-field"
                />
              </div>
            </label>

            <div className="login-forgot-password">
              <a href="#" className="login-forgot-password-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-submit-button">
              Login
            </button>

            <button type="button" className="login-google">
              <FcGoogle size={20} />
              <p>Login with Google</p>
            </button>
          </div>
        </div>

        <div className="login-right-panel">
          <div className="education-svg-container">
            <motion.svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <circle cx="100" cy="100" r="80" fill="#4361EE" />
              <path
                d="M60,100 L100,60 L140,100 L100,140 Z"
                fill="#ffffff"
                stroke="#2541B2"
                strokeWidth="4"
              />
            </motion.svg>
            <motion.svg
              width="150"
              height="150"
              viewBox="0 0 150 150"
              initial={{ y: -20 }}
              animate={{ y: 20 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <rect x="25" y="25" width="100" height="80" fill="#FFA500" rx="10" />
              <text x="75" y="85" fontSize="60" fill="#ffffff" textAnchor="middle">
                A+
              </text>
            </motion.svg>
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <polygon points="50,10 61,35 90,35 65,55 75,80 50,65 25,80 35,55 10,35 39,35" fill="#FFD700" />
            </motion.svg>
          </div>
          <div className="education-quote">
            <p>"{educationalQuotes[currentQuote].text}"</p>
            <p className="quote-author">- {educationalQuotes[currentQuote].author}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
