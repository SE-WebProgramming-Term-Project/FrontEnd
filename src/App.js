import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/menuPage/Menu";
import Cart from "./components//menuPage/Cart";
import Detail from "./components//menuPage/Detail";
import Alvolmain from "./components/Alvolmain/Alvolmain";
import UserMypage from "./components/UserMypage/UserMypage";
import Orderhistory from "./components/Orderhistory/Orderhistory";
import ChangeInform from "./components/ChangeInform/ChangeInform";
import Login from "./components/Login/Login";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Alvolmain />} />
            <Route path="/Posts" element={<Posts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Detail" element={<Detail />} />
            <Route path="/UserMypage" element={<UserMypage />} />
            <Route path="/Orderhistory" element={<Orderhistory />} />
            <Route path="/ChangeInform" element={<ChangeInform />} />
            <Route path="/Login" element= {<Login/>}/>
        </Routes>
    );
}



export default App;