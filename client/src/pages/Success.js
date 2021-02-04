import React, { useEffect } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from "../utils/helpers";


function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const rooms = cart.map(item => item._id);
            console.log('success room');
            let userId = cart[0].bookings[cart[0].bookings.length - 1].user._id;
            console.log("userID: " + userId);
            if (rooms.length) {
                const { data } = await addOrder({ 
                    variables: { 
                        _id: rooms[0],
                        input: {
                            bookingDateStart: cart[0].bookings[cart[0].bookings.length - 1].bookingDateStart,
                            bookingDateEnd: cart[0].bookings[cart[0].bookings.length - 1].bookingDateEnd,
                            user: userId,
                        } 
                    } 
                });

               cart.forEach((item) => {
                   console.log(item);
                    idbPromise('cart', 'delete', item);
                });
            }

            setTimeout(() => {
                window.location.assign('/')
            }, 3000)
        }

        saveOrder();
    }, [addOrder]);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>
                    Thank you for your purchase!
                </h2>
                <h3>
                    Click on Booking History to see your reservations.
                </h3>
                <h2>
                    You will now be redirected to the homepage.
                </h2>
            </Jumbotron>
        </div>
    );
};

export default Success;