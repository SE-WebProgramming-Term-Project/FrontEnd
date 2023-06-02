import React, { useState } from 'react';
import './css/AdminMyPage.css';


const AdminMyPage = () => {
    const handleMenuRegisterClick = () => {
        console.log('메뉴 등록 버튼이 클릭되었습니다.');
    };

    const handleSalesQuantityClick = () => {
        console.log('판매 수량 확인 버튼이 클릭되었습니다.');
    };

    return (
        <div className='header'>
            <div className="my-page-container">
                <h2>마이페이지</h2>
                <div className="button-container">
                    <button className="menu-register-button" onClick={handleMenuRegisterClick}>
                        메뉴 등록
                    </button>
                    <button className="sales-quantity-button" onClick={handleSalesQuantityClick}>
                        판매 수량 확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminMyPage;
