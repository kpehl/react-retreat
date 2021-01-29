import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../../utils/queries";

function retrieveUser() {

}

function Nav() {
  const { data } = useQuery(QUERY_USER);
  let user;
  console.log(data)
  if (data) {
    user = data.user;
  }
 
  function showNavigation(user) {
     if (Auth.loggedIn() /*&& !user.admin*/) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Reservation History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } /*else if (Auth.loggedIn() && user.admin) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/admin">
              Admin
        </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start }
            <a href="/" onClick={() => Auth.logout()}>
              Logout
        </a>
          </li>
        </ul>
      )
    }

    */else {
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
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">hotel image goes here</span>
          -Name of Hotel
        </Link>
      </h1>

      <nav>
        {showNavigation(user)}
      </nav>
    </header>
  );
}

export default Nav;
