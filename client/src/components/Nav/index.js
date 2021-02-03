import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../../utils/queries";

function Nav() {
  const { data } = useQuery(QUERY_USER);
  let user;
  let admin;
  if (data) {
    user = data.user;
    admin = data.user.admin;
  }
  if (Auth.loggedIn() && user === null) {
    Auth.logout()
  };
 
  function showNavigation() {
     if (Auth.loggedIn() && !admin) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/bookingHistory">
              Booking History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
            <Link to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      );
    } else if (Auth.loggedIn() && admin) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/admin">
              Admin
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start*/ }
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
            <Link to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 space-between">
      <h1>
        <Link to="/">
          <img src="logo512.png" alt="react retreat logo" />
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
