import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_ROOMS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

import { UPDATE_ROOMS, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART } from '../utils/actions';

import Cart from "../components/Cart";

import { idbPromise } from "../utils/helpers";

import { useDispatch, useSelector } from 'react-redux';

// import CustomSlider from "../components/MainSlider";


function Detail() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const [currentProduct, setCurrentProduct] = useState({})
  
  const { loading, data } = useQuery(QUERY_ROOMS);
  
  const { rooms, cart } = state;
  
  useEffect(() => {
    // data already in the global state
    if (rooms.length) {
      setCurrentProduct(rooms.find(room => room._id === id));
    } else if (data) {
      // retrieve data from the server
      dispatch({
        type: UPDATE_ROOMS,
        rooms: data.rooms
      });
      // and store that data in IndexedDB
      data.rooms.forEach((room) => {
        idbPromise('rooms', 'put', room);
      });
    // if the user is offline, use the cached data in IndexedDB
    } else if (!loading) {
      idbPromise('rooms', 'get').then((indexedRooms) => {
        dispatch({
          type: UPDATE_ROOMS,
          rooms: indexedRooms
        });
      });
    }
  }, [rooms, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    // if the room is already in the cart, update the quantity instead of adding duplicate items
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // and also store in IndexedDB
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    // if the room is not yet in the cart, add it
    } else {
      dispatch({
        type: ADD_TO_CART,
        room: { ...currentProduct, purchaseQuantity: 1 }
      });
      // and also store in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    // remove the room from the cart
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
    // update IndexedDB to reflect the deleted room
    idbPromise('cart', 'delete', { ...currentProduct })
  };

  console.log(currentProduct)

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Rooms
          </Link>


          {/* <CustomSlider room={currentProduct.name}/> */}

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Reserve
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Booking
            </button>
          </p>

          <img className="collage"
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
