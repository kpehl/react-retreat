import React, { useEffect } from "react";
import CartItem from "../components/CartItem";
import Auth from "../utils/auth";
//import './style.css';



import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";

import { useDispatch, useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Reservation() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    // async function to get data from IndexedDB
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, room: [...cart] });
    }
    // check global state for any cart room, and if not, use function to retrieve data from the IndexedDB store
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  let duration = 0;
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
        let bookingsNumber = item.bookings.length;
        let newstart = new Date(item.bookings[bookingsNumber -1].bookingDateStart);
        let newEnd = new Date(item.bookings[bookingsNumber -1].bookingDateEnd);
        
        var res = Math.abs(newEnd - newstart) / 1000;
        duration = Math.floor(res / 86400);
        sum = item.price * duration;
    });
    if(isNaN(sum)){
        sum = 0;
    }
    return sum.toFixed(2);
  }

  function submitCheckout() {
    let roomId ;
    const currentBookings = [];
    let duration, room;

    state.cart.forEach((item) => {
        let bookingsNumber = item.bookings.length;
        let newstart = new Date(item.bookings[bookingsNumber -1].bookingDateStart);
        let newEnd = new Date(item.bookings[bookingsNumber -1].bookingDateEnd);
        
        var res = Math.abs(newEnd - newstart) / 1000;
        duration = Math.floor(res / 86400);
        roomId = item._id;
        room = item;
    });
 
    getCheckout({
      variables: { 
          _id: roomId,
          duration: duration,
        }
    });
  }


  return (
<<<<<<< HEAD
    <div className="reserve-container my-2">
=======
    <div className="">
>>>>>>> develop
      <h2>Reservation</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>

        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
}

export default Reservation;
