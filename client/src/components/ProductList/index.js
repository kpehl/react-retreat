import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { QUERY_ROOMS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

import { UPDATE_ROOMS } from "../../utils/actions";

import { idbPromise } from "../../utils/helpers";

import { useDispatch, useSelector } from 'react-redux';

function ProductList() {

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_ROOMS);

  useEffect(() => {
    // when there is data to be stored
    if (data) {
      // store in the global state object
      dispatch({
        type: UPDATE_ROOMS,
        rooms: data.rooms
      });
      // and store it in IndexedDB
      data.rooms.forEach((room) => {
        idbPromise('rooms', 'put', room);
      });
    } else if (!loading) {
      // if loading is undefined, the user is offline - get data from the `rooms` store in IndexedDB
      idbPromise('rooms', 'get').then((rooms) => {
        // use the IndexedDB data to set the global state for offline browsing
        dispatch({
          type: UPDATE_ROOMS,
          rooms: rooms
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterRooms() {
    console.log("FILTER");
    if (!currentCategory) {

      console.log(state.rooms);
      return state.rooms;
    }

    return state.rooms.filter(room => room.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Rooms:</h2>
      {state.rooms.length ? (
        <div className="flex-row">
            {filterRooms().map(room => (
                <ProductItem
                  key= {room._id}
                  _id={room._id}
                  image={room.image}
                  name={room.name}
                  price={room.price}
                  quantity={room.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any rooms yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
