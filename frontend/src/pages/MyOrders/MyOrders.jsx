import React from 'react';
import "./MyOrders.css";

import { useLocation, useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const reservationData = location.state || {};

    const dishes = [
        { id: 1, name: "Pasta", price: 12 },
        { id: 2, name: "Pizza", price: 15 },
        { id: 3, name: "Salad", price: 8 },
    ];

    return (
        <div className='my-order'>
            <h2>Reservation Details</h2>
            {Object.keys(reservationData).length === 0 ? (
                <p>No reservation data found. Please go back and make a reservation.</p>
            ) : (
                <div>
                    <p><strong>Name:</strong> {reservationData.customerName}</p>
                    <p><strong>Email:</strong> {reservationData.email}</p>
                    <p><strong>Phone:</strong> {reservationData.phone}</p>
                    <p><strong>Table Number:</strong> {reservationData.tableNumber}</p>
                    <p><strong>Booking Time:</strong> {reservationData.bookingTime}</p>
                    <p><strong>Special Request:</strong> {reservationData.specialRequest || "None"}</p>
                    <p><strong>Selected Dishes:</strong></p>
                    <ul>
                        {reservationData.selectedDishes.map(dishId => {
                            const dish = dishes.find(d => d.id === dishId);
                            return <li key={dishId}>{dish.name} - ${dish.price}</li>;
                        })}
                    </ul>
                    <p><strong>Payment Method:</strong> {reservationData.paymentMethod === "cod" ? "Cash on Delivery" : "Stripe"}</p>
                </div>
            )}
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default MyOrders;
