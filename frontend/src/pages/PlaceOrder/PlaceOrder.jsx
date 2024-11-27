import React, { useState } from 'react';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const [reservationData, setReservationData] = useState({
        customerName: "",
        email: "",
        phone: "",
        tableNumber: "",
        bookingTime: "",
        specialRequest: "",
        selectedDishes: [],
        paymentMethod: "cod", // Default payment method
    });

    const navigate = useNavigate();

    const dishes = [
        { id: 1, name: "Pasta", price: 12 },
        { id: 2, name: "Pizza", price: 15 },
        { id: 3, name: "Salad", price: 8 },
    ];

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setReservationData(data => ({ ...data, [name]: value }));
    };

    const onDishSelect = (dishId) => {
        setReservationData(data => {
            const { selectedDishes } = data;
            const updatedDishes = selectedDishes.includes(dishId)
                ? selectedDishes.filter(id => id !== dishId)
                : [...selectedDishes, dishId];
            return { ...data, selectedDishes: updatedDishes };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to the ReservationDetails page with data
        navigate('/MyOrders', { state: reservationData });
    };

    return (
        <form onSubmit={handleSubmit} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Reservation Details</p>
                <input 
                    type="text" 
                    name='customerName' 
                    onChange={onChangeHandler} 
                    value={reservationData.customerName} 
                    placeholder='Your Name' 
                    required 
                />
                <input 
                    type="email" 
                    name='email' 
                    onChange={onChangeHandler} 
                    value={reservationData.email} 
                    placeholder='Email Address' 
                    required 
                />
                <input 
                    type="text" 
                    name='phone' 
                    onChange={onChangeHandler} 
                    value={reservationData.phone} 
                    placeholder='Phone Number' 
                    required 
                />
                <input 
                    type="number" 
                    name='tableNumber' 
                    onChange={onChangeHandler} 
                    value={reservationData.tableNumber} 
                    placeholder='Table Number' 
                    required 
                />
                <input 
                    type="datetime-local" 
                    name='bookingTime' 
                    onChange={onChangeHandler} 
                    value={reservationData.bookingTime} 
                    required 
                />
                <textarea 
                    name="specialRequest" 
                    onChange={onChangeHandler} 
                    value={reservationData.specialRequest} 
                    placeholder="Special Requests (Optional)" 
                />
            </div>

            <div className="place-order-right">
                <div className="dish-selection">
                    <h2>Select Dishes</h2>
                    <div className="dish-list">
                        {dishes.map(dish => (
                            <div key={dish.id} className="dish-item">
                                <input 
                                    type="checkbox" 
                                    checked={reservationData.selectedDishes.includes(dish.id)} 
                                    onChange={() => onDishSelect(dish.id)} 
                                />
                                <label>{dish.name} ($ {dish.price})</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setReservationData(data => ({ ...data, paymentMethod: "cod" }))} className="payment-option">
                        <input 
                            type="radio" 
                            checked={reservationData.paymentMethod === "cod"} 
                            onChange={() => setReservationData(data => ({ ...data, paymentMethod: "cod" }))}
                        />
                        <label>COD (Pay on Arrival)</label>
                    </div>
                    <div onClick={() => setReservationData(data => ({ ...data, paymentMethod: "stripe" }))} className="payment-option">
                        <input 
                            type="radio" 
                            checked={reservationData.paymentMethod === "stripe"} 
                            onChange={() => setReservationData(data => ({ ...data, paymentMethod: "stripe" }))}
                        />
                        <label>Stripe (Credit / Debit)</label>
                    </div>
                </div>

                <button type="submit" className='place-order-submit'>Confirm Reservation</button>
            </div>
        </form>
    );
};

export default PlaceOrder;
