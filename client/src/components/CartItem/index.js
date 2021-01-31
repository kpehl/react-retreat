import React, { useState } from "react";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  UPDATE_RESERVATION_DATES,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

const CartItem = ({ item }) => {
  // const state = useSelector((state) => {
  //     return state;
  // });
  const dispatch = useDispatch();
  const [statedt, setStatedt] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    // also update IndexedDB
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  const onDateChange = (e) => {
    console.log(e);
    dispatch({
      type: UPDATE_RESERVATION_DATES,
      _id: item._id,
    });
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
        <div className="flex-row">
          <DateRangePicker
            onChange={(item) => {
              setStatedt([item.selection]);
              onDateChange(item);
            }}
            /* onChange={onDateChange} */
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={statedt}
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
