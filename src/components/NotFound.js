import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound(props) {
  return (
    <div>
      <h2>404</h2>
      <p>
        Page not found. Go to <NavLink to="/">Home</NavLink>
      </p>
    </div>
  );
}
