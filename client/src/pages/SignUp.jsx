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
      <form onSubmit={submitHandler} className="app-container">
        <div className="left-panel">
          <button type="button" className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="sign-in-link">
            Already a member?{" "}
            <Link to="/login" className="sign-in">
              Sign in
            </Link>
          </div>

          <div className="sign-up-form">
            <h1 className="title">Sign Up</h1>

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

            <button type="button" className="google">
              <FcGoogle size={20} />
              <p>Sign Up with Google</p>
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="container">
            <h2 className="title">Indian Education Symbols</h2>
            <div className="svg-container">
              {/* SVG content (unchanged) */}
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
}
