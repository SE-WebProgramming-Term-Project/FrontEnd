import React from "react";
import { useLocation } from "react-router-dom";
import Menu_header from "./Menu_header";
import "./css/Detail.css";
import "./css/Menu_header.css";

function Detail() {
    const location = useLocation();
    const pizzaInfo = location.state.pizzaInfo;

    return (

        <div>
            <header>
                <Menu_header/>
            </header>
            <main>
                <img src={pizzaInfo.img}></img>
                <p>타이틀: {pizzaInfo.title}</p>
                <p>태그: {pizzaInfo.tag}</p>
                <p>라지: {pizzaInfo.large}</p>
                <p>레귤러: {pizzaInfo.regular}</p>
            </main>

        </div>
    );
}

export default Detail;
