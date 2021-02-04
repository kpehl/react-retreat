import React from "react";
import { Link, useHistory } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

import { useDispatch, useSelector } from 'react-redux';


function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity,
    bookings,
  } = item;

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const { cart } = state;
  const history = useHistory();

  const addToCart = () => {
    // check for a matching item in the cart
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    // if there is a match, use UPDATE and update the purchase quantity, otherwise use ADD; store data in IndexedDB as well
    if(itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        room: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
    history.push('/reservation');
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/rooms/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        {/* <div>{quantity} {pluralize("item", quantity)} in stock</div> */}
        <span>${price} per night</span>
      </div>
      <button onClick={addToCart}>Reserve</button>
    </div>
  );
}

export default ProductItem;
