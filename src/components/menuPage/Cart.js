import React from "react";
import { useLocation } from "react-router-dom";
import './css/Cart.css'
function Cart() {
    const location = useLocation();
    const cartItems = location.state;

    return (

        <div>
            <header>
                <div className="pc-pizzamenu-top-text">
                    <p className="pizzamenu-top-text-body2">장바구니</p>
                </div>
                <div className="order-basket-list-header">
                    <div className="order-basket-list-menu">메뉴</div>
                    <div className="order-basket-list-count">수량</div>
                    <div className="order-basket-list-price">가격</div>
                    <div className="order-basket-list-change">변경</div>
                    <div className="order-basket-list-change">삭제</div>
                </div>

            </header>
            <main>
                <h1>장바구니 페이지 입니다.</h1>
                {cartItems.length > 0 ? (
                    <ul>
                        <div className="baskit">
                            <div className="img"></div>
                        </div> //TODO 피자 장바구니 수정해야함, CSS도
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
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default Cart;