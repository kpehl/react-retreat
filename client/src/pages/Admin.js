import React, {useState} from "react";
import { Link } from "react-router-dom"

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_USERS } from "../utils/queries";

import SingleUserDetail from '../components/SingleUserDetail'

function ReservationHistory() {
  const { data } = useQuery(QUERY_ALL_USERS);
  let users;

  if (data) {
    users = data.users;
  }

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
      setShowDetails(showDetails => !showDetails)
  };
  const clickHandler = (user) => {
    toggleDetails();
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Home
          </Link>

        {users ? (
          <>
            <h2>Guest List</h2>
            {users.map((user) => (
              <div key={user._id} className="my-2">
                <h3>{user.firstName} {user.lastName} {user.admin}</h3>
                <p>
                  Email: {user.email}
                </p>
                <p>
                  Number of bookings: {user.bookings.length}
                </p>
                <button id={user._id} key={user._id} onClick={(user) => clickHandler(user)}>Details</button>
                { showDetails ? <SingleUserDetail bookings={user.bookings} /> : null}
              </div>
            ))}
          </>
        ) : null}
      </div>

    </>)

};

export default ReservationHistory;
