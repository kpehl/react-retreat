// import actions
import {
    UPDATE_ROOMS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    UPDATE_RESERVATION_DATES,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';

// Set default state  
const defaultState = {
    rooms: [],
    categories: [],
    currentCategory: '',
    cart: [],
    cartOpen: false
}

// Root reducer
const reducer = (state=defaultState, action) => {
    switch (action.type) {
        // if the action type value is the value of `UPDATE_ROOMS`, return a new state object with an updated rooms array
        case UPDATE_ROOMS:
            return {
                ...state,
                rooms: [...action.rooms],
            };
        // if the action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        // if the action type value is the value of `UPDATE_CURRENT_CATEGORY`, return a new state object with an updated currentCategory value
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        // if the action type is ADD_TO_CART, return a new state object with the updated cart object
        case ADD_TO_CART:
            return {
              ...state,
              cartOpen: true,
              cart: [...state.cart, action.room]  
            };
        // if the action type is REMOVE_FROM_CART, return a new state object with the updated cart and close the cart if last item is removed
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(room => {
                return room._id !== action._id;
            });
            
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        // if the action type is UPDATE_CART_QUANTITY, return a new state object with the updated cart, updating only the quantity of the specified
        // room ID and returning room for unchanged rooms
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(room => {
                    if (action._id === room._id) {
                        room.purchaseQuantity = action.purchaseQuantity;
                    }
                    return room;
                })
            };
        // if action type is UPDATE_RESERVATION_DATES, return new state object with updated reservation dates.
        case UPDATE_RESERVATION_DATES:
            return {
                ...state,
                cart: state.cart.map(room => {
                    if(action._id === room._id){
                        room.bookings = [...room.bookings, action.bookings];
                    }
                    return room;
                })
            };            
       // if the action type is CLEAR_CART, return a new state object with the cart emptied and closed
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        // if the action type is TOGGLE_CART, return a new state object with the cartOpen property toggled
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        // if it's none of these actions, do not update the state and just return the current state
        default:
            return state;
    }
};

export default reducer;