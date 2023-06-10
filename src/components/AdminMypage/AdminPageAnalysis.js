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
        axios
            .get('http://localhost:5000/order/findAll')
            .then((response) => {
                const orders = response.data.orderData;
                const pizzaSales = {};
                orders.forEach((order) => {
                    order.orderMenu.forEach((pizzaId) => {
                        if (!pizzaSales[pizzaId]) {
                            pizzaSales[pizzaId] = 0;
                        }
                        pizzaSales[pizzaId]++;
                    });
                });
                setPizzaSales(pizzaSales);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const pizzaNames = Object.keys(pizzaSales);
    const pizzaQuantities = Object.values(pizzaSales);

    const labels2 = ['일', '월', '화', '수', '목', '금', '토'];
    const sales = salesByDayOfWeek;

    return (
        <div className="admin-page-analysis">
            <div className="admin-page-analysis-container">
                <div className="top-text">
                    메뉴별 판매수량
                </div>
                <div className="chart-area">
                    <AdminPageAmountChart labels={pizzaNames} amounts={pizzaQuantities} />
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