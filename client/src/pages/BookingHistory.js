import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_BOOKINGS } from "../utils/queries";


function BookingHistory() {
  let user;
  let bookings;

  const { data: userData } = useQuery(QUERY_USER);
  // console.log(userData)

  if (userData) {
    console.log('user data present');
    // console.log(userData);
    user = userData.user;
    // console.log(user)
  }

  const {data: bookingData } = useQuery(QUERY_BOOKINGS);

  if (bookingData) {
    console.log('booking data present')
    let bookingArray = bookingData.bookings;
    // console.log(bookingArray)
    bookings = bookingArray.filter(booking => booking.user._id === user._id)
    // console.log(bookings)
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Home
          </Link>

        {user && bookings ? (
          <>
            <h2>Booking History for {user.firstName} {user.lastName}</h2>
            <div className="flex-row">
                  <p>If you need to change or cancel a confirmed booking, please contact our staff.</p>
            </div>
            {bookings.map(booking => (
              <div key={booking._id} className="my-2">
                <h4>Confirmation Number: {booking._id}</h4>
                <div>
                    <p><span>Reservation Dates: {new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>  
                    <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                  </div>
                <div className="flex-row">
                    <div key={booking.rooms._id} className="my-2">
                      <Link to={`/rooms/${booking.rooms._id}`}>
                        <p>{booking.rooms.name}</p>
                      </Link>
                      <div>
                        <p><span>${booking.rooms.price}</span></p>
                        <p><span>Reservation Dates: {new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>  
                        <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </>
        ) : null}

      </div>

    </>)

};

export default BookingHistory;
