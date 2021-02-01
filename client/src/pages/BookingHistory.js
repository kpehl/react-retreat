import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ROOMS, QUERY_BOOKINGS } from "../utils/queries";


function BookingHistory() {
  let user;
  let bookings;
  let bookingIds;
  

  const { data: userData } = useQuery(QUERY_USER);
  // console.log(userData)

  if (userData) {
    console.log('user data present');
    // console.log(userData);
    user = userData.user;
    console.log(user)
  }

  const {data: bookingData } = useQuery(QUERY_BOOKINGS);

  if (bookingData) {
    console.log('booking data present')
    let bookingArray = bookingData.bookings;
    bookings = bookingArray.filter(booking => booking.user._id === user._id)
    console.log(bookings)
    // bookingIds = bookings.map(booking => booking._id)
    // console.log(bookingIds)
  }

  // const { data: roomData } = useQuery(QUERY_ROOMS);
  
  // if (roomData) {
  //   console.log('room data present')
  //   console.log(roomData)
  //   let roomsArray = roomData.rooms;
  //   console.log(roomsArray)
  //   // let roomBookingsArray = roomsArray.filter(room => bookingIds.includes(room.bookings._id))
  //   // console.log(roomBookingsArray)
  // }

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
                {/* <div className="flex-row">
                  {booking.room.map(({ _id, name, price}, index) => (
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
                </div> */}
              </div>
            ))}
          </>
        ) : null}

      </div>

    </>)

};

export default BookingHistory;
