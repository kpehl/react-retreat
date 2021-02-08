import React from "react";

function SingleUserDetail({bookings}) {
    // console.log(bookings)

  return (
      <>
        {bookings? bookings.map(booking => (
            <div className="card-admin px-1 py-1" key={booking._id}>
                <h4>Confirmation Number: {booking._id}</h4>
                <p>Purchase Date: {new Date(parseInt(booking.purchaseDate)).toLocaleDateString()}</p>
                {booking.rooms.map(({name}, index) => (
                <p key={index}>Room: {name}</p>
                ))}
                <p>Reservation Dates: <span>{new Date(parseInt(booking.bookingDateStart)).toLocaleDateString()} to {new Date(parseInt(booking.bookingDateEnd)).toLocaleDateString()}</span></p>
                <p>Duration of Stay: {booking.duration}</p>
                <p>Total Cost: {booking.totalCost}</p>
            </div>
        )) : null}
    </>
  );
}

export default SingleUserDetail;