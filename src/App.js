import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/menuPage/Menu";
import Cart from "./components/menuPage/Cart";
import Detail from "./components/menuPage/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
