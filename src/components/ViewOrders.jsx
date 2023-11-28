import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewOrders = ({ setShowOrderDetailsModal, selectedOrder, setReload }) => {
    const [orderList, setOrderList] = useState([]);
    const [deliveryTime, setDeliveryTime] = useState("");
    const [address, setAddress] = useState({});

    useState(() => {
        console.log(selectedOrder);
        const getOrderList = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7722/order/item/${selectedOrder.customerorderid}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                setOrderList(data);
                console.log(data); // Log the fetched data
            } catch (error) {
                console.error("Error fetching order list:", error);
            }
        };

        const getAddress = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7722/address/${selectedOrder.customerid}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                setAddress(data[0]);
                console.log(data); // Log the fetched data
            } catch (error) {
                console.error("Error fetching order list:", error);
            }
        };

        getAddress();

        getOrderList();
    }, []);

    useEffect(() => {
        console.log(orderList);
    }, [orderList]);

    const processOrder = async () => {
        let text = "";
        let status = "";
        if (selectedOrder.customerorderstatus === "Pending") {
            text = "Yes, process it!";
            status = "Processing";
        } else if (
            selectedOrder.customerorderstatus === "Processing" &&
            selectedOrder.order_method === "Delivery"
        ) {
            text = "Yes, deliver it!";
            status = "Out for Delivery";
        } else {
            text = "Yes, complete it!";
            status = "Completed";
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10B981",
            cancelButtonColor: "#EF4444",
            confirmButtonText: text,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `http://localhost:7722/order/process/${selectedOrder.customerorderid}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                status: status,
                                deliverytime: deliveryTime,
                            }),
                        }
                    );
                    const data = await response.json();
                    console.log(data); // Log the fetched data
                    Swal.fire({
                        title: "Processed!",
                        text: "Order has been processed.",
                        icon: "success",
                        confirmButtonColor: "#10B981",
                    });
                } catch (error) {
                    console.error("Error fetching order list:", error);
                }
            }
        });

        setReload(true);
        setShowOrderDetailsModal(false);
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            className="z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full fixed inset-0 flex items-center justify-center"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Order Details
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            onClick={() => setShowOrderDetailsModal(false)}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-3">
                        <table className="table-auto w-full">
                            {/* [
                                    {
                                        "customeraddressid": "SFMA5238548110000000",
                                        "customerid": "C56463520",
                                        "customerfullname": "Justmyr Gutierrez",
                                        "customercontactnumber": "09063488667",
                                        "customerstreet": "Sitio 7",
                                        "customerbarangay": "Balete Relocation Site",
                                        "customercity": "Batangas City",
                                        "customernotes": "",
                                        "customeraddresslabel": "work",
                                        "customeraddressdefault": true,
                                        "addresslatitude": "13.81907555",
                                        "addresslongitude": "121.06428337048469"
                                    }
                                ] */}

                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">
                                        <h3 className="text-lg font-semibold">
                                            Customer Name:
                                        </h3>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {address.customerfullname}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">
                                        <h3 className="text-lg font-semibold">
                                            Contact Number:
                                        </h3>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {address.customercontactnumber}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">
                                        <h3 className="text-lg font-semibold">
                                            Address:
                                        </h3>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {address.customerstreet
                                            ? address.customerstreet + ", "
                                            : ""}
                                        {address.customerbarangay + ", "}
                                        {address.customercity}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">
                                        <h3 className="text-lg font-semibold">
                                            Notes:
                                        </h3>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {address.customernotes}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {selectedOrder.customerorderstatus === "Pending" && (
                        <>
                            <div className="p-6 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    Line Items: {orderList.length}
                                </h3>
                                {orderList.map((item) => (
                                    <div
                                        className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2 hover:bg-gray-200"
                                        key={item.customerorderitemid}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">
                                                {item.foodmenuname}
                                            </h3>
                                            <p className="text-gray-600">
                                                Cut Type: {item.foodmenucuttype}
                                            </p>
                                            <p className="text-gray-600">
                                                Price: {item.foodmenuprice}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <p className="text-gray-600">
                                                    Quantity:{" "}
                                                    {
                                                        item.customerorderitemquantity
                                                    }
                                                </p>
                                                <p className="text-gray-600">
                                                    Total Price:{" "}
                                                    {
                                                        item.customerorderitemtotalprice
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between">
                                    <h3 className="text-base">
                                        {/* sum all the total price */}
                                        Total Price:{" "}
                                        {orderList.reduce(
                                            (acc, cur) =>
                                                acc +
                                                parseFloat(
                                                    cur.customerorderitemtotalprice
                                                ),
                                            0
                                        )}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => processOrder()}
                                >
                                    Process Order
                                </button>
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    onClick={() =>
                                        setShowOrderDetailsModal(false)
                                    }
                                >
                                    Decline
                                </button>
                            </div>
                        </>
                    )}
                    {selectedOrder.customerorderstatus === "Processing" &&
                        selectedOrder.order_method === "Delivery" && (
                            <>
                                <div className="p-6 space-y-3">
                                    <h3 className="text-lg font-semibold">
                                        Line Items: {orderList.length}
                                    </h3>
                                    {orderList.map((item) => (
                                        <div
                                            className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2 hover:bg-gray-200"
                                            key={item.customerorderitemid}
                                        >
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">
                                                    {item.foodmenuname}
                                                </h3>
                                                <p className="text-gray-600">
                                                    Cut Type:{" "}
                                                    {item.foodmenucuttype}
                                                </p>
                                                <p className="text-gray-600">
                                                    Price: {item.foodmenuprice}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="mr-4">
                                                    <p className="text-gray-600">
                                                        Quantity:{" "}
                                                        {
                                                            item.customerorderitemquantity
                                                        }
                                                    </p>
                                                    <p className="text-gray-600">
                                                        Total Price:{" "}
                                                        {
                                                            item.customerorderitemtotalprice
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-center justify-between">
                                        <label className="text-lg font-semibold">
                                            Delivery Time:
                                        </label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-lg p-2"
                                            value={deliveryTime}
                                            onChange={(e) =>
                                                setDeliveryTime(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base">
                                            {/* sum all the total price */}
                                            Total Price:{" "}
                                            {orderList.reduce(
                                                (acc, cur) =>
                                                    acc +
                                                    parseFloat(
                                                        cur.customerorderitemtotalprice
                                                    ),
                                                0
                                            )}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                    <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => processOrder()}
                                    >
                                        Deliver Order
                                    </button>
                                    <button
                                        data-modal-hide="default-modal"
                                        type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                        onClick={() =>
                                            setShowOrderDetailsModal(false)
                                        }
                                    >
                                        Decline
                                    </button>
                                </div>
                            </>
                        )}

                    {selectedOrder.customerorderstatus ===
                        "Out for Delivery" && (
                        <>
                            <div className="p-6 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    Line Items: {orderList.length}
                                </h3>
                                {orderList.map((item) => (
                                    <div
                                        className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2 hover:bg-gray-200"
                                        key={item.customerorderitemid}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">
                                                {item.foodmenuname}
                                            </h3>
                                            <p className="text-gray-600">
                                                Cut Type: {item.foodmenucuttype}
                                            </p>
                                            <p className="text-gray-600">
                                                Price: {item.foodmenuprice}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <p className="text-gray-600">
                                                    Quantity:{" "}
                                                    {
                                                        item.customerorderitemquantity
                                                    }
                                                </p>
                                                <p className="text-gray-600">
                                                    Total Price:{" "}
                                                    {
                                                        item.customerorderitemtotalprice
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between">
                                    <h3 className="text-base">
                                        {/* sum all the total price */}
                                        Total Price:{" "}
                                        {orderList.reduce(
                                            (acc, cur) =>
                                                acc +
                                                parseFloat(
                                                    cur.customerorderitemtotalprice
                                                ),
                                            0
                                        )}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => processOrder()}
                                >
                                    Complete Order
                                </button>
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue
                                    -300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    onClick={() =>
                                        setShowOrderDetailsModal(false)
                                    }
                                >
                                    Decline
                                </button>
                            </div>
                        </>
                    )}

                    {selectedOrder.customerorderstatus === "Completed" && (
                        <>
                            <div className="p-6 space-y-3">
                                <h3 className="text-lg font-semibold">
                                    Line Items: {orderList.length}
                                </h3>
                                {orderList.map((item) => (
                                    <div
                                        className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2 hover:bg-gray-200"
                                        key={item.customerorderitemid}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">
                                                {item.foodmenuname}
                                            </h3>
                                            <p className="text-gray-600">
                                                Cut Type: {item.foodmenucuttype}
                                            </p>
                                            <p className="text-gray-600">
                                                Price: {item.foodmenuprice}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <p className="text-gray-600">
                                                    Quantity:{" "}
                                                    {
                                                        item.customerorderitemquantity
                                                    }
                                                </p>
                                                <p className="text-gray-600">
                                                    Total Price:{" "}
                                                    {
                                                        item.customerorderitemtotalprice
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between">
                                    <h3 className="text-base">
                                        {/* sum all the total price */}
                                        Total Price:{" "}
                                        {orderList.reduce(
                                            (acc, cur) =>
                                                acc +
                                                parseFloat(
                                                    cur.customerorderitemtotalprice
                                                ),
                                            0
                                        )}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    onClick={() =>
                                        setShowOrderDetailsModal(false)
                                    }
                                >
                                    Close
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewOrders;
