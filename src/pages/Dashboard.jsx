import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Dashboard = () => {
    const [customerCount, setCustomerCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [saleCount, setSaleCount] = useState(0);

    const [id, setId] = useState(localStorage.getItem("userID"));

    useEffect(() => {
        if (localStorage.getItem("userID") === null) {
            //if the user is not logged in, redirect to login page
            window.location.href = "/login";
        } else {
            if (
                localStorage.getItem("userRoleID") !== "ADM" &&
                localStorage.getItem("userRoleID") !== "STF"
            ) {
                //if the user is not a customer, redirect to login page
                window.location.href = "/menu";
            }
        }
    }, []);

    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7722/admin/${id}`
                );
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };

        fetchAdmin();
    }, [id]); // Added id as a dependency

    // Extract months and profits for chart

    const [monthlyProfits, setMonthlyProfits] = useState({});
    const months = Object.keys(monthlyProfits);
    const profitss = Object.values(monthlyProfits);
    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Monthly Profits for 2023",
                data: profitss,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    useEffect(() => {
        const getCustomerCount = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7722/customer/count/`
                );
                const jsonData = await response.json();
                setCustomerCount(jsonData.count);
            } catch (err) {
                console.error(err.message);
            }
        };
        getCustomerCount();

        const getOrderCount = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7722/order/count/${admin.branchid}`
                );

                const jsonData = await response.json();

                setOrderCount(jsonData.count);
            } catch (err) {
                console.error(err.message);
            }
        };
        getOrderCount();

        const getProductCount = async () => {
            try {
                const response = await fetch(
                    "http://localhost:7722/product/count"
                );

                const jsonData = await response.json();

                setProductCount(jsonData.count);
            } catch (err) {
                console.error(err.message);
            }
        };
        getProductCount();

        const getSaleCount = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7722/order/success/${admin.branchid}`
                );

                const jsonData = await response.json();
                setSaleCount(jsonData.sum);
            } catch (err) {
                console.error(err.message);
            }
        };
        getSaleCount();
        const fetchMonthlyProfit = async (month) => {
            try {
                const response = await fetch(
                    `http://localhost:7722/transaction_sum/${month}`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch profits for ${month}`);
                }

                const data = await response.json();
                console.log(data.sum, "sum");
                return data.sum;
            } catch (error) {
                console.error(`Error fetching profits for ${month}:`, error);
                return 0; // Return 0 in case of an error
            }
        };

        const updateMonthlyProfits = async () => {
            const months = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ];
            const updatedProfits = {};

            try {
                // Use Promise.all to fetch profits for all months concurrently
                const profits = await Promise.all(
                    months.map(async (month) => await fetchMonthlyProfit(month))
                );

                // Update the monthlyProfits object
                months.forEach((month, index) => {
                    //to number
                    updatedProfits[month] = parseInt(profits[index]);
                });
            } catch (error) {
                console.error("Error updating monthly profits:", error);
            } finally {
                setLoadingProfits(false);
                setMonthlyProfits(updatedProfits);
            }
        };

        updateMonthlyProfits();
    }, [admin.branchid]); // Added admin.branchid as a dependency

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [1092, 744, 924, 934, 1290, 1330, 1320],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <section className="section">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Customers
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    {customerCount}
                                </p>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Orders
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    {orderCount}
                                </p>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Products
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    {productCount}
                                </p>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-lg shadow">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-gray-800">
                                    Sales
                                </h2>
                                <p className="card-text text-3xl font-bold text-gray-800">
                                    {saleCount}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="graph-container">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
