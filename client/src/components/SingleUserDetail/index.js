import React from "react";

function SingleUserDetail({bookings}) {
    // console.log(bookings)

  return (
      <>
        {bookings? bookings.map(booking => (
            <div className="card px-1 py-1" key={booking._id}>
                <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                <p>Room: {booking.room[0].name}</p>
                <p>Reservation Dates: <span>{new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>
            </div>
        )) : null}
    </>
  );
}

export default SingleUserDetail;