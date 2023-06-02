import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/menuPage/Menu";
import Cart from "./components//menuPage/Cart";
import Detail from "./components//menuPage/Detail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Detail" element={<Detail />} />
        </Routes>
    );
}



export default App;