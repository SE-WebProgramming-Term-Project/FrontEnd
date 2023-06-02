import React from "react";
import { useLocation } from "react-router-dom";
import './css/Cart.css';

function Cart() {
    const location = useLocation();
    const cartItems = location.state;

    return (
        <div>
            <h1>장바구니 페이지 입니다.</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((pizza, index) => (
                        <li key={index}>
                            <img src={pizza.img} alt="피자 이미지" />
                            <h3>{pizza.title}</h3>
                            <h6>{pizza.tag}</h6>
                            <p>{pizza.large}</p>
                            <p>{pizza.update}</p>
                            <p>{pizza.category}</p>
                            {/* Display other pizza information as needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>장바구니가 비어있습니다.</p>
            )}
        </div>
    );
}

export default Cart;
