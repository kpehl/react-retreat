import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_BOOKINGS } from "../utils/queries";


function BookingHistory() {
  let user;
  let bookings;
  let duration = [];
  let totalCost = [];

  const { data: userData } = useQuery(QUERY_USER);
  // console.log(userData)

  if (userData) {
    // console.log('user data present');
    // console.log(userData);
    user = userData.user;
    // console.log(user)
  }

  const {data: bookingData } = useQuery(QUERY_BOOKINGS);

  if (bookingData) {
    // console.log('booking data present')
    let bookingArray = bookingData.bookings;
    bookings = bookingArray.filter(booking => booking.user._id === user._id)
    bookings = bookings.sort((a,d) => a.bookingDateStart - d.bookingDateStart);
    bookings.forEach((booking, index) => {
      let res = Math.abs(booking.bookingDateEnd - booking.bookingDateStart) / 1000;
      duration[index] = Math.floor(res / 86400);
      totalCost[index] = (duration[index] * booking.rooms[0].price).toFixed(2);
    })
  }

  return (
    <>
      <div className="container flex-row">
        <Link className="link" to="/">
          ← Back to Home
          </Link>
          <div className="row">
            <div className="card-main px-2 py-2">
              {user && bookings ? (
              <>
                <h2>Booking History for {user.firstName} {user.lastName}</h2>
                <div className="flex-row">
                  <p>If you need to change or cancel a confirmed booking, please contact our staff.</p>
                </div>
                {bookings.map((booking, bookingIndex) => (
                <div key={booking._id} className="my-2">
                  <h4>Confirmation Number: {booking._id}</h4>
                  <div className="card-booking px-2 py-2 mb-3">
                  {booking.rooms.map(({ _id, name, price}, index) => (
                    <div key={index} className="my-2">
                        <Link to={`/rooms/${_id}`}>
                          <p>{name}</p>
                        </Link>
                        <div>
                          <p>Total Nights: {duration[bookingIndex]}</p>
                          <p><span>${totalCost[bookingIndex]}</span></p>
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
          </div>
      </div>

    </>)

};

export default BookingHistory;
