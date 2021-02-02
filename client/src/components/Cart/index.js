import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';

import { useDispatch, useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

const Cart = () => {
    const state = useSelector((state) => {
        return state;
    });
    const dispatch = useDispatch();

    const[getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        // async function to get data from IndexedDB
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, room: [...cart] });
        };
        // check global state for any cart room, and if not, use function to retrieve data from the IndexedDB store
        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    useEffect(() => {
        if(data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session })
            });
        }
    }, [data]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                Checkout
            </div>
        )
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        getCheckout({
            variables: { room: productIds }
        });

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id)
            }
        });
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                {state.cart.map(item => (
                    <CartItem key={item._id} item={item} />
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                    Auth.loggedIn() ?
                        <button onClick={submitCheckout}>
                        Checkout
                        </button>
                        :
                        <span>(log in to check out)</span>
                    }
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
};

export default Cart;