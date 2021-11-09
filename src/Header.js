import React from "react";
import "./Header.css";
import play from "./play.png";
import back from "./Back.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export const Header = () => {
  return (
    <nav className="nav">
      <Link   className="nav-link  py-3 px-3"  aria-current="page" to="/MainGame">
        <img
          src={play}
          width="50"
          height="40"
          className="d-inline-block align-top"
          alt=""
        />
      </Link>
      <Link className="nav-link py-3 px-1"  to="/">
        <img
          src={back}
          width="50"
          height="40"
          className="d-inline-block align-top"
          alt=""
        />
      </Link>
    </nav>
  );
};
