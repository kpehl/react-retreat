import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function BookingHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  let bookings;

  if (data) {
    user = data.user;
    bookings = data.user.bookings
    console.log(user)
    console.log(bookings)
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Home
          </Link>

        {user ? (
          <>
            <h2>Booking History for {user.firstName} {user.lastName}</h2>
            <div className="flex-row">
                  <p>If you need to change or cancel a confirmed booking, please contact our staff.</p>
            </div>
            {bookings.map((booking) => (
              <div key={booking._id} className="my-2">
                <h4>Confirmation Number: {booking._id}</h4>
                <div className="flex-row">
                  {booking.room.map(({ _id, name, price, bookingDateStart, bookingDateEnd }, index) => (
                    <div key={index} className="my-2">
                      <Link to={`/rooms/${_id}`}>
                        <p>{name}</p>
                      </Link>
                      <div>
                        <p><span>${price}</span></p>
                        <p><span>Reservation Dates: {new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>  
                        <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}

      </div>

    </>)

};

export default BookingHistory;
