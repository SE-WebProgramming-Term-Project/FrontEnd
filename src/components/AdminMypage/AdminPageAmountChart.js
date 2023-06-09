import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function AdminPageAmountChart({labels, amounts}) {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: '메뉴별 판매수량',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: '판매수량',
                data: amounts,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Bar options={chartOptions} data={data} />;
}