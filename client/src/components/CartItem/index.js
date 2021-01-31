import React, { useState } from "react";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  UPDATE_RESERVATION_DATES,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch } from "react-redux";


import { enUS } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'




const CartItem = ({ item }) => {
  // const state = useSelector((state) => {
  //     return state;
  // });
  const dispatch = useDispatch();

  let d = new Date();
    let n = d.toUTCString();

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
  


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

  const onDateChange = (startDate, endDate) => {
      console.log("onDateChange");
    console.log(startDate);
    console.log(endDate);
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
            {/* insert date picker */}
            <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      minimumDate={new Date()}
      minimumLength={1}
      format='dd MMM yyyy'
      locale={enUS}
      onChange={onDateChange(startDate, endDate)}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Start date'
          />
          <span className='date-range_arrow' />
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='End date'
          />
        </div>
      )}
    </DateRangePicker>
            {/* End Date Picker */}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
