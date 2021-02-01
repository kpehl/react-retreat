import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import logo from '../../assets/logo.png';
=======
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../../utils/queries";
>>>>>>> develop

function Nav() {
  const { data } = useQuery(QUERY_USER);
  let user;
  let admin;
  console.log(data)
  if (data) {
    user = data.user;
    admin = data.user.admin;
  }
 
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
    <header className="flex-row px-1">

      <div className="logo">
      
        <Link to="/">
<<<<<<< HEAD
        <img src={logo} alt="React Retreat"/>
          
=======
          <span role="img" aria-label="hotel building">🏨</span>
          React Retreat
>>>>>>> develop
        </Link>
        

      </div>
     
     

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
