import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom"

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_USERS, QUERY_BOOKINGS } from "../utils/queries";

import SingleUserDetail from '../components/SingleUserDetail'

function ReservationHistory() {
  const { data: userData } = useQuery(QUERY_ALL_USERS);
  let users;
  let bookings;
  let duration = [];
  let totalCost = [];

  if (userData) {
    users = userData.users;
  }

  const { data: bookingData } = useQuery(QUERY_BOOKINGS);
  let bookingArray;

  if (bookingData) {
    bookingArray = bookingData.bookings;
    bookings = bookingArray.sort((a,d) => a.bookingDateStart - d.bookingDateStart);
    bookings.forEach((booking, index) => {
      let res = Math.abs(booking.bookingDateEnd - booking.bookingDateStart) / 1000;
      duration[index] = Math.floor(res / 86400);
      booking.duration = duration[index]
      totalCost[index] = (duration[index] * booking.rooms[0].price).toFixed(2);
      booking.totalCost = totalCost[index]
      // console.log(booking)
    })
  }

  const [showDetails, setShowDetails] = useState(false);
  const [detailUserID, setDetailUserID] = useState(null);
  const toggleDetails = () => {
    setShowDetails(showDetails => !showDetails)
  };
  const clickHandler = (userID) => {
    // console.log(userID)
    toggleDetails();
    setDetailUserID(userID);
    // console.log(detailUserID)
  }

  return (

    <div className="container flex-row">
      <Link className="link" to="/">
        ← Back to Home
          </Link>
      <div className="row">
        <div className="card-main px-2 py-2">
          {users && bookingArray ? (
            <>
              <h2>Guest List</h2>
              {users.map((user) => (
                <div key={user._id} className="card-admin px-2 py-2 mb-3">
                  <h3>{user.firstName} {user.lastName} {user.admin}</h3>
                  <p>
                    Email: {user.email}
                  </p>
                  <p>
                    Number of bookings: {(bookings.filter(booking => booking.user._id === user._id)).length}
                  </p>
                  <button className="admin-btn" id={user._id} key={user._id} onClick={(event) => clickHandler(user._id)}>Details</button>
                    { showDetails && detailUserID === user._id ? <SingleUserDetail bookings={(bookings.filter(booking => booking.user._id === user._id))} /> : null} 
                </div>
              ))}
              <hr/>
              <h2>Bookings</h2>
              {bookingArray.map((booking) => (
                <div key={booking._id} className="card-admin px-2">
                  <h3>Confirmation Number: {booking._id}</h3>
                  <div className="card-admin px-2" key={booking._id}>
                    <p>Guest: {booking.user.firstName} {booking.user.lastName}</p>
                    <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                    <p>Room: {booking.rooms[0].name}</p>
                    <p>Reservation Dates: <span>{new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>
                    <p>Duration of Stay: {booking.duration}</p>
                    <p>Total Cost: {booking.totalCost}</p>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>)

};

export default ReservationHistory;
