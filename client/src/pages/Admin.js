import React, {useState} from "react";
import { Link } from "react-router-dom"

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_USERS, QUERY_BOOKINGS } from "../utils/queries";

import SingleUserDetail from '../components/SingleUserDetail'

function ReservationHistory() {
  const { data: userData } = useQuery(QUERY_ALL_USERS);
  let users;

  if (userData) {
    users = userData.users;
  }

  const {data: bookingData } = useQuery(QUERY_BOOKINGS);
  let bookingArray;

  if (bookingData) {
    bookingArray = bookingData.bookings;
  }

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
      setShowDetails(showDetails => !showDetails)
  };
  const clickHandler = () => {
    toggleDetails();
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Home
          </Link>

        {users && bookingArray ? (
          <>
            <h2>Guest List</h2>
            {users.map((user) => (
              <div key={user._id} className="my-2">
                <h3>{user.firstName} {user.lastName} {user.admin}</h3>
                <p>
                  Email: {user.email}
                </p>
                <p>
                  Number of bookings: {(bookingArray.filter(booking => booking.user._id === user._id)).length}
                </p>
                <button id={user._id} key={user._id} onClick={(user) => clickHandler(user)}>Details</button>
                { showDetails ? <SingleUserDetail bookings={(bookingArray.filter(booking => booking.user._id === user._id))} /> : null}
              </div>
            ))}
            <h2>Bookings</h2>
            {bookingArray.map((booking) => (
              <div key={booking._id} className="my-2">
                <h3>Confirmation Number: {booking._id}</h3>
                <div className="card px-1 py-1" key={booking._id}>
                  <p>Guest: {booking.user.firstName} {booking.user.lastName}</p>
                  <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                  <p>Room: {booking.rooms.name}</p>
                  <p>Reservation Dates: <span>{new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>

    </>)

};

export default ReservationHistory;
