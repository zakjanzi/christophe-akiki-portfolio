import React from "react";
import "./Intro.css";
import { useSelector } from "react-redux";

export default function Intro() {
  const authRedux = useSelector((state) => state.auth);

  return (
    <div className="intro-wraper">
      <div className="container intro-text">
        <p className="typed-heading">
          Welcome, <span>{authRedux.user.username}</span>
          <br />
        </p>
      </div>
    </div>
  );
}
