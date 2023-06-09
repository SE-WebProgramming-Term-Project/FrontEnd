import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/Cart.css";
import Nav from "../Nav/Nav";
import axios from "axios";

function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const [counts, setCounts] = useState(cartItems.map(() => 1));
  const [locationState, setLocationState] = useState(cartItems);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const formatPrice = (price) => {
    //1000단위
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleOrder = () => {
    const orderMenu = locationState.map((pizza) => pizza._id);
    console.log(counts);
    const orderData = {
      orderMenu: orderMenu,
      id: userData.id,
      dest: userData.address + " " + userData.detailAddress,
      totalPrice: calculateTotalPrice(),
      orderDate: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      store: "대구점",
    };

    const cartItemsWithCount = cartItems.map((item, index) => ({
      ...item,
      newCount: counts[index],
    }));

    console.log(cartItemsWithCount);

    axios
      .post("http://localhost:5000/order/buy", orderData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    cartItemsWithCount.map((pizzaData) => {
      axios
        .post("http://localhost:5000/pizza/countUpdate", pizzaData)
        .then((response) => {
            console.log(pizzaData);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // 주문 완료 후 cart 항목 제거
    localStorage.removeItem("cart");
    navigate("/");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    axios
      .get("http://localhost:5000/user/view", {
        params: { id },
      })
      .then((response) => {
        const tmpData = response.data.userData;

        console.log(tmpData);
        setUserData(tmpData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("userData has changed:", userData);
  }, [userData]);

  const handleDecrement = (index) => {
    if (counts[index] > 1) {
      const newCounts = [...counts];
      newCounts[index] -= 1;
      setCounts(newCounts);
    }
  };

  const handleIncrement = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const handleRemove = (index) => {
    const newCartItems = [...locationState];
    newCartItems.splice(index, 1);
    setLocationState(newCartItems);
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts.splice(index, 1);
      return newCounts;
    });

    // Remove item from localStorage
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < locationState.length; i++) {
      const count = counts[i];
      totalPrice += (locationState[i].large || 0) * count;
    }
    return totalPrice;
  };

  useEffect(() => {
    console.log("Counts have changed:", counts);
    const updatedPizzaInfo = counts.map((count, index) => {
      const pizza = locationState[index];
      return {
        ...pizza,
        count,
      };
    });
    console.log("Updated pizza information:", updatedPizzaInfo);

    const totalPrice = calculateTotalPrice();
    console.log("Total price:", totalPrice);
  }, [counts, locationState]);

  return (
    <div>
      <Nav />
      <header id="cart_header">
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
        {locationState.length > 0 ? (
          <ul>
            <div className="baskit">
              {locationState.map((pizza, index) => (
                <li className="pizzaBox" key={index}>
                  <img
                    className="pizza_img"
                    src={pizza.img}
                    alt="피자 이미지"
                  />
                  <div className="pizzaInfo">
                    <h3 className="cart_pizza_title">{pizza.title}</h3>
                    <span className="pizza_option"> L</span>
                  </div>
                  <div className="pizza_cart_info">
                    <div className="count_state">
                      <img
                          src="data:image/svg+xml;base64,PHN2ZyBpZD0iXy0iIGRhdGEtbmFtZT0iLSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2NjYzsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjMwIiBjeT0iMzAiIHI9IjMwIi8+CiAgPHJlY3QgY2xhc3M9ImNscy0yIiB4PSIxOCIgeT0iMjkiIHdpZHRoPSIyNSIgaGVpZ2h0PSIzIi8+Cjwvc3ZnPgo="
                          alt="plus button"
                          className="cursor_disable_minus"
                          onClick={() => handleDecrement(index)}
                      />

                      <span className="count_number">{counts[index]}</span>
                      <img
                          src="data:image/svg+xml;base64,PHN2ZyBpZD0iXyIgZGF0YS1uYW1lPSIrIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MiIgaGVpZ2h0PSI2MiIgdmlld0JveD0iMCAwIDYyIDYyIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICAgIHN0cm9rZTogIzQxYjZlNjsKICAgICAgICBzdHJva2Utd2lkdGg6IDJweDsKICAgICAgfQoKICAgICAgLmNscy0yLCAuY2xzLTMgewogICAgICAgIGZpbGw6ICM0MWI2ZTY7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjMxIiBjeT0iMzEiIHI9IjMwIi8+CiAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjI4LDg2N2gyNXYzSDYyOHYtM1ptMTEtMTFoM3YyNWgtM1Y4NTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjA5IC04MzcpIi8+CiAgPHJlY3QgaWQ9IuyCrOqwge2YlV8yIiBkYXRhLW5hbWU9IuyCrOqwge2YlSAyIiBjbGFzcz0iY2xzLTMiIHg9IjMwIiB5PSIzMCIgd2lkdGg9IjMiIGhlaWdodD0iMyIvPgo8L3N2Zz4K"
                          alt="minus button"
                          className="cursor_pointer_plus"
                          onClick={() => handleIncrement(index)}
                      />
                    </div>
                    <div className="cart_info_end">
                    {/* Display other pizza information as needed */}
                    <p className="price_large">
                      {formatPrice(pizza.large * counts[index])}
                      원
                    </p>
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyBpZD0i64W47Jej7KeAIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MiIgaGVpZ2h0PSI5MiIgdmlld0JveD0iMCAwIDkyIDkyIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTIsIC5jbHMtMyB7CiAgICAgICAgZmlsbDogIzAwMDAwMDsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNDYiIGN5PSI0NiIgcj0iNDYiLz4KICA8cGF0aCBpZD0iYnRuX3giIGNsYXNzPSJjbHMtMiIgZD0iTTI3My4wMTQsNzAxTDI3NSw2OTkuMDEzLDMwMi45ODYsNzI3LDMwMSw3MjguOTg2Wm0yOS45NzIsMEwzMDEsNjk5LjAxMywyNzMuMDE0LDcyNywyNzUsNzI4Ljk4NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNDIgLTY2OCkiLz4KICA8cmVjdCBpZD0i7IKs6rCB7ZiVXzEiIGRhdGEtbmFtZT0i7IKs6rCB7ZiVIDEiIGNsYXNzPSJjbHMtMyIgeD0iNDQiIHk9IjQ0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ii8+Cjwvc3ZnPgo="
                        alt="장바구니 아이템 닫기"
                        className="x-button"
                        onClick={() => handleRemove(index)}
                    />
                    </div>
                  </div>

                </li>
              ))}
            </div>

            <div className="bottom-fixed">
              <div className="total-layout">
                <h4 className="sum-total">합계</h4>
                <h4 className="total">
                  총<span>{formatPrice(calculateTotalPrice())}</span>원
                </h4>
              </div>
            </div>
            <div className="button-layout">
              <Link
                to="/Posts"
                state={locationState}
                className="menu-add-button"
              >
                메뉴추가
              </Link>
              <div
                className="basic-button"
                onClick={() => {
                  handleOrder();
                }}
              >
                주문하기
              </div>
            </div>
          </ul>
        ) : (
          <div>
            <p>장바구니가 비어있습니다.</p>
            <div className="button-layout">
              <Link
                to="/Posts"
                state={locationState}
                className="menu-add-button"
              >
                메뉴추가
              </Link>
            </div>
          </div>
        )}
      </main>
      <footer></footer>
    </div>
  );
}

export default Cart;