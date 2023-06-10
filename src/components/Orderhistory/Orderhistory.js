import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./css/Orderhistory.css";
import Review from "../Review/Review";
import Nav from "../Nav/Nav";
import UserMypage from "../UserMypage/UserMypage";

function Orderhistory() {
  let data = []
  const [menuname, setMenuname] = useState([]);

  // useEffect(() => {
  //   const fetchMenuNames = async () => {
  //     console.log(data)
  //     const names = await Promise.all(
  //       data.map((i) =>
  //         axios
  //           .get("http://localhost:5000/pizza/view", {
  //             params: { _id: { $in: i.orderMenu } },
  //           })
  //           .then(
  //             (response) => response.data.pizzaData.title)
  //           .catch((error) => {
  //             console.log(error);
  //             return "";
  //           })
  //       )
  //     );
  //     setMenuname(names);
  //   };

  //   fetchMenuNames();
  // }, []);
  useEffect(()=>{
    let idx =0
    axios
    .get("http://localhost:5000/order/view", {
      params: { id: localStorage.getItem("id") },
    })
    .then((response) => {
      console.log(localStorage.getItem("id"));
      
      console.log(response.data);
      const orders = response.data.orderData;

      orders.forEach((order) => {
        data[idx] = order;
        idx++;
      });
      
     
    })
    .catch((error) => {
      console.error(error);
    });},[data])

  
  useEffect(() => {
    const fetchMenuNames = async () => {
      const names = await Promise.all(
        data.map((i) =>
          Promise.all(
            i.orderMenu.map((menuId) =>
              axios
                .get("http://localhost:5000/pizza/view", {
                  params: { _id: menuId },
                })
                .then((response) => response.data.pizzaData.title)
                .catch((error) => {
                  console.log(error);
                  return "";
                })
            )
          )
        )
      );
  
      const menuTitles = names.map((menuArr) => menuArr.join(" "));
      setMenuname(menuTitles);
    };
  
    fetchMenuNames();

    console.log(menuname);
  }, []);

  return (
    <div className="Ordercontainer">
      <UserMypage />
      {console.log(data.length)}
      {data &&data.length > 0 ? (
        data.map((i, index) => (
          <div className="Orderinforcontainer" key={i.id}>
            <div className="inform">
              <div className="title">주문일자</div>
              <div className="inner">{i.orderDate}</div>
            </div>
            <div className="inform">
              <div className="title">주문메뉴</div>
              <div className="inner">{menuname[index]}</div>
            </div>
            <div className="inform">
              <div className="title">결제금액</div>
              <div className="inner">{i.totalPrice}</div>
            </div>
            <div className="inform">
              <div className="title">배달지정보</div>
              <div className="inner">{i.dest}</div>
            </div>
            <div className="inform">
              <div className="title">주문매장</div>
              <div className="inner">{i.store}</div>
            </div>
              {i.isReviewed ? '':<Review data={i}/>}
          </div>
        ))
      ) : (
        <span>주문내역이 없습니다.</span>
      )}
    </div>
  );
}

export default Orderhistory;
