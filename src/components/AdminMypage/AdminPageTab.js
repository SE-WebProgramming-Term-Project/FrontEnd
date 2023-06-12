import {useNavigate} from "react-router-dom";
import './css/AdminPageTab.css'
import React from "react";

function AdminPageTab() {
    const navigate = useNavigate();

    const handlePizzaRegist = () => {
        navigate("/AdminPageMenuRegist");
    }

    const handlePizzaAnalysis = () => {
        navigate("/AdminPageAnalysis");
    }

    return (
        <div className="menutab-page-whole-div">
            <div className="menutab-page-menutab">
                <div className="menutab-page-title">
                    <span className='rightText' onClick={() => handlePizzaRegist()}>피자 등록</span>
                </div>
                <div className="menutab-page-title">
                    <span className='rightText' onClick={() => handlePizzaAnalysis()}>판매 수량 확인</span>
                </div>
            </div>
        </div>
    );
}

export default AdminPageTab;