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
                    `https://santafetaguktukan.online/api/admin/${id}`
                );
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };

        fetchAdmin();
    }, [id]); // Added id as a dependency

    useEffect(() => {
        const getCustomerCount = async () => {
            try {
                const response = await fetch(
                    `https://santafetaguktukan.online/api/customer/count/`
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
                    `https://santafetaguktukan.online/api/order/count/${admin.branchid}`
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
                    "https://santafetaguktukan.online/api/product/count"
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
                    `https://santafetaguktukan.online/api/order/success/${admin.branchid}`
                );

                const jsonData = await response.json();
                setSaleCount(jsonData.sum);
            } catch (err) {
                console.error(err.message);
            }
        };
        getSaleCount();
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
                            <Bar data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
