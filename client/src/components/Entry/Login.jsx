import React, { useState } from "react";
import "./Entry.css";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiUser, BiLockAlt } from "react-icons/bi";
import { DEV_BASE_URL, LOGIN_URL, PROD_BASE_URL } from "../../api/urlConfig";
import { isDevEnvironment } from "../../utils/functions";
import { signIn } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toastError, toastSuccess } from "../../utils/toast";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const authRedux = useSelector((state) => state.auth);

  const validateLoginForm = () => {
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

    const errors = validateLoginForm();

    if (errors.length > 0) {
      toastError(errors.join(" -> "));
      return;
    }

    try {
      const loginUrl = isDevEnvironment()
        ? DEV_BASE_URL + LOGIN_URL
        : window.location.origin + LOGIN_URL;

      const { data } = await axiosPrivate.post(LOGIN_URL, {
        username,
        password,
      });

      if (data.success) {
        dispatch(signIn(data));
        navigate("/dashboard");
      } else {
        toastError(data.message);
      }
    } catch (err) {
      toastError("An error occurred while trying to log in. Please try again");
      console.log(err);
    }
  };

  return authRedux.isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="login-cont">
      <div className="my-form">
        <h1>login</h1>
        <form onSubmit={submitForm}>
          <div className="entry-input-wraper">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
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
              required
            />
            <BiLockAlt className="entry-icon" />
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
