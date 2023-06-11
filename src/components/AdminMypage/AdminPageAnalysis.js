import axios from "axios";
import {useEffect, useState} from "react";
import "./css/AdminPageAnalysis.css";
import {AdminPageAmountChart} from "./AdminPageAmountChart";
import {AdminPageSalesChart} from "./AdminPageSalesChart";

function AdminPageAnalysis() {

  const [pizzaData, setPizzaData] = useState([]);
  const [dayOfWeekLabels, setDayOfWeekLabels] = useState([]);
  const [salesAmounts, setSalesAmounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/order/findAll')
        .then((response) => {
          const orders = response.data.orderData;
          const salesByDay = {};

          const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
          weekdays.forEach((weekday) => {
            salesByDay[weekday] = 0;
          });

          orders.forEach((order) => {
            const { orderDate, totalPrice } = order;
            const weekday = getWeekdayFromOrderDate(orderDate);

            salesByDay[weekday] += totalPrice;
          });

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
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dateParts = orderDate.split('. ');
    const timePart = dateParts[2];
    const datePart = dateParts[1].replace(/\./g, '');
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
    axios.get('http://localhost:5000/pizza/findAll')
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
          <AdminPageAmountChart
            labels={labels}
            amounts={amounts}
          />
        </div>
        <div className="top-text">요일별 총 매출</div>
        <div className="chart-area">
          <AdminPageSalesChart labels={dayOfWeekLabels.filter((label) => label !== undefined)} sales={salesAmounts} />
        </div>
      </div>
    </div>
  );
}

export default AdminPageAnalysis;