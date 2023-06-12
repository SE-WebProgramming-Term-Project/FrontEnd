import './css/Menu_header.css'
import React from "react";
function Menu_header(){
    return(
        <div className="pc-pizzamenu-top-text">
            <p className="pizzamenu-top-text-body2">피자</p>
            <p className="pizzamenu-top-text-footer">
                맛있고 건강한 피자! 피자알볼로의
                <font color="#41b6e6"> 다양한 피자를 주문</font>해 보세요.
            </p>
        </div>
    )
}

export default Menu_header;