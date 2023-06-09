import {AdminPageSalesChart} from "./AdminPageSalesChart";
import {AdminPageAmountChart} from "./AdminPageAmountChart";
import axios from "axios";
import {useEffect, useState} from "react";
import './css/AdminPageAnalysis.css'

function AdminPageAnalysis() {

    return (
        <div className="admin-page-analysis">
            <div className="admin-page-analysis-container">
                <div className="top-text">
                    메뉴별 판매수량
                </div>
                <div className="chart-area">
                    {/*<AdminPageAmountChart labels={pizzas} amounts={amounts}></AdminPageAmountChart>*/}
                </div>
                <div className="top-text">
                    요일별 총 매출
                </div>
                <div className="chart-area">
                    {/*<AdminPageSalesChart labels={dayOfTheWeek} sales={sales}></AdminPageSalesChart>*/}
                </div>
            </div>
        </div>
    )
}

export default AdminPageAnalysis;