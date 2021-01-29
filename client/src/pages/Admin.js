import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function ReservationHistory() {
  const { data } = useQuery(QUERY_USER);
  let users;

  if (data) {
    users = data.users;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Reservations
          </Link>

        {users ? (
          <>
            <h2>Reservation History for {users.firstName} {users.lastName}</h2>
            {users.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img
                          alt={name}
                          src={`/images/${image}`}
                        />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
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

export default ReservationHistory;
