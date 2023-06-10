import { AdminPageSalesChart } from "./AdminPageSalesChart";
import { AdminPageAmountChart } from "./AdminPageAmountChart";
import axios from "axios";
import { useEffect, useState } from "react";
import './css/AdminPageAnalysis.css';

function AdminPageAnalysis() {
    const [salesByDayOfWeek, setSalesByDayOfWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [pizzaSales, setPizzaSales] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:5000/order/findAll")
            .then((response) => {
                const orders = response.data.orderData;
                const salesByDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
                orders.forEach((order) => {
                    const orderDate = new Date(order.orderDate);
                    const dayOfWeek = orderDate.getDay();
                    salesByDayOfWeek[dayOfWeek] += order.totalPrice;
                });
                setSalesByDayOfWeek(salesByDayOfWeek);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        Promise.all([
            axios.get("http://localhost:5000/order/count"),
            axios.get("http://localhost:5000/pizza/findAll"),
        ])
            .then(([ordersResponse, pizzasResponse]) => {
                const orders = ordersResponse.data;
                const pizzas = pizzasResponse.data;
                const pizzaSales = {};
                orders.forEach((order) => {
                    order.orderMenu.forEach((pizzaId) => {
                        const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
                        if (pizza) {
                            if (!pizzaSales[pizza.title]) {
                                pizzaSales[pizza.title] = 0;
                            }
                            pizzaSales[pizza.title]++;
                        }
                    });
                });
                setPizzaSales(pizzaSales);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // 차트에 표시할 데이터를 계산합니다.
    const labels1 = Object.keys(pizzaSales);
    const amounts = Object.values(pizzaSales);

    const labels2 = ['일', '월', '화', '수', '목', '금', '토'];
    const sales = salesByDayOfWeek;

    return (
        <div className="admin-page-analysis">
            <div className="admin-page-analysis-container">
                <div className="top-text">
                    메뉴별 판매수량
                </div>
                <div className="chart-area">
                    <AdminPageAmountChart labels={labels1} amounts={amounts} />
                </div>
                <div className="top-text">
                    요일별 총 매출
                </div>
                <div className="chart-area">
                    <AdminPageSalesChart labels={labels2} sales={sales} />
                </div>
            </div>
        </div>
    );
}

export default AdminPageAnalysis;