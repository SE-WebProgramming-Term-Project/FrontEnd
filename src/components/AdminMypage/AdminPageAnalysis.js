import axios, { toFormData } from "axios";
import { useEffect, useState } from "react";
import "./css/AdminPageAnalysis.css";
import { AdminPageAmountChart } from "./AdminPageAmountChart";
import { AdminPageSalesChart } from "./AdminPageSalesChart";

function AdminPageAnalysis() {
  const [pizzaData, setPizzaData] = useState([]);
  const [dayOfWeekLabels, setDayOfWeekLabels] = useState([]);
  const [salesAmounts, setSalesAmounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/order/findAll")
      .then((response) => {
        const orders = response.data.orderData;
        const salesByDay = {};

        const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
        weekdays.forEach((weekday) => {
          salesByDay[weekday] = 0;
        });

        const today = new Date(); // 현재 날짜
        const currentDayOfWeek = today.getDay(); // 현재 요일의 인덱스 (0: 일요일, 1: 월요일, ... , 6: 토요일)

        console.log(today)

        // 현재 날짜부터 이번 주의 월요일까지의 총 매출을 계산하여 salesByDay에 저장
        for (let i = currentDayOfWeek - 1; i >= 0; i--) {
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() - i); // 현재 날짜에서 i일 이전의 날짜로 설정

          const targetDateString = `${targetDate.getFullYear()}. ${
            targetDate.getMonth() + 1
          }. ${targetDate.getDate()}.`;
          const weekday = getWeekdayFromOrderDate(targetDateString);

          orders.forEach((order) => {
            const { orderDate, totalPrice } = order;
            const orderWeekday = getWeekdayFromOrderDate(orderDate);

            if (weekday === orderWeekday) {
              salesByDay[weekday] += totalPrice;
            }
          });
        }

        const labels = Object.keys(salesByDay);
        const amounts = Object.values(salesByDay);

        setDayOfWeekLabels(labels);
        setSalesAmounts(amounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getWeekdayFromOrderDate = (orderDate) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const dateParts = orderDate.split(". ");
    const timePart = dateParts[2];
    const datePart = dateParts[1].replace(/\./g, "");
    const dateString = `${datePart} ${timePart}`;
    const orderDateObject = new Date(dateString);

    let dayOfWeekIndex = orderDateObject.getDay();
    if (dayOfWeekIndex === 0) {
      dayOfWeekIndex = 7;
    }

    const weekday = weekdays[dayOfWeekIndex - 1];

    return weekday;
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/pizza/findAll")
      .then((response) => {
        const pizzas = response.data.pizzaData;
        setPizzaData(pizzas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const menuAmounts = {};
  pizzaData.forEach((pizza) => {
    const { title, count } = pizza;
    if (!menuAmounts[title]) {
      menuAmounts[title] = 0;
    }
    menuAmounts[title] += count;
  });

  const labels = Object.keys(menuAmounts);
  const amounts = Object.values(menuAmounts);

  return (
    <div className="admin-page-analysis">
      <div className="admin-page-analysis-container">
        <div className="top-text">메뉴별 판매수량</div>
        <div className="chart-area">
          <AdminPageAmountChart labels={labels} amounts={amounts} />
        </div>
        <div className="top-text">요일별 총 매출</div>
        <div className="chart-area">
          <AdminPageSalesChart
            labels={dayOfWeekLabels.filter((label) => label !== undefined)}
            sales={salesAmounts}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPageAnalysis;
