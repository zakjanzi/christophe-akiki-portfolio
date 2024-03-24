import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Entry.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiUser, BiLockAlt } from "react-icons/bi";
import { toastError, toastSuccess } from "../../utils/toast";
import { isDevEnvironment } from "../../utils/functions";
import { DEV_BASE_URL, REGISTER_URL, PROD_BASE_URL } from "../../api/urlConfig";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const validateSignupForm = () => {
    const errors = [];

    if (username === "") {
      errors.push("Username is required");
    }

    if (password === "") {
      errors.push("Password is required");
    }

    return errors;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const errors = validateSignupForm();

    if (errors.length > 0) {
      toastError(errors.join(" -> "));
      return;
    }

    try {
      const registerUrl = isDevEnvironment()
        ? DEV_BASE_URL + REGISTER_URL
        : PROD_BASE_URL + REGISTER_URL;

      const { data } = await axios.post(registerUrl, {
        username,
        password,
        isAdmin: false,
      });

      if (data.success) {
        toastSuccess(data.message);
        setTimeout(() => {
          navigate("/admin/login");
        }, 5000);
      } else {
        toastError(data.message);
      }
    } catch (err) {
      toastError("An error occurred while registering");
      console.log(err);
    }
  };

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="login-cont">
      <div className="my-form">
        <h1>register</h1>
        <form onSubmit={submitForm}>
          <div className="entry-input-wraper">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            <BiUser className="entry-icon" />
          </div>

          <div className="entry-input-wraper">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BiLockAlt className="entry-icon" />
          </div>

          <button type="submit">Sign up</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
