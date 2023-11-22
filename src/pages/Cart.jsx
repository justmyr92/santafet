import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
    const customerID = localStorage.getItem("userID");

    const [cart, setCart] = useState([]);

    const [foods, setFoods] = useState([]);
    const [foodPrices, setFoodPrices] = useState([]);
    const [updatedQuantity, setUpdatedQuantity] = useState({});
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("userID") === null) {
            //if the user is not logged in, redirect to login page
            window.location.href = "/login";
        } else {
            if (localStorage.getItem("userRoleID") !== "CUS") {
                //if the user is not a customer, redirect to login page
                window.location.href = "/";
            }
        }
    }, []);

    const handleCheckboxChange = (id) => {
        const isChecked = checkedItems.includes(id);

        if (isChecked) {
            // If already checked, remove from the list
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            // If not checked, add to the list
            setCheckedItems([...checkedItems, id]);
        }
    };

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetch(
                    `https://santafetaguktukan.online/api/cart/${customerID}`
                );
                const jsonData = await response.json();
                setCart(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };
        getCart();

        const getFoods = async () => {
            try {
                const response = await fetch("https://santafetaguktukan.online/api/food");
                const jsonData = await response.json();
                setFoods(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };
        getFoods();

        // app.get("/food/price/:id", async (req, res) => {
        //     try {
        //         const { id } = req.params;
        //         const allFoodPrice = await pool.query(
        //             "SELECT * FROM foodMenuPriceTable WHERE foodMenuID = 1",
        //             [id]
        //         );
        //         res.json(allFoodPrice.rows);
        //     } catch (err) {
        //         console.error(err.message);
        //     }
        // });

        const getFoodPrices = async () => {
            try {
                const response = await fetch(
                    "https://santafetaguktukan.online/api/food/price"
                );
                const jsonData = await response.json();
                setFoodPrices(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };

        getFoodPrices();

        console.log(cart);
        console.log(foods);
        console.log(foodPrices);
    }, []);

    const deleteCart = async (id) => {
        try {
            const deleteCart = await fetch(
                `https://santafetaguktukan.online/api/cart/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            setCart(cart.filter((cart) => cart.cartid !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const updateQuantity = async (id, quantity) => {
        try {
            const response = await fetch(
                `https://santafetaguktukan.online/api/cart/update/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quantity }),
                }
            );

            if (response.ok) {
                console.log(`Quantity updated for cart item {id}`);
            } else {
                console.error(`Failed to update quantity for cart item {id}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleQuantityChange = (id, quantityChange) => {
        const currentQuantity = updatedQuantity[id] || 0;
        const newQuantity = currentQuantity + quantityChange;

        // Check if the new quantity is greater than or equal to 0
        if (newQuantity >= 1) {
            // Update quantity in the state
            setUpdatedQuantity({
                ...updatedQuantity,
                [id]: newQuantity,
            });

            // Trigger immediate update to the database
            updateQuantity(id, newQuantity);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mx-auto my-8 p-8 bg-white shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Order Summary</h2>

                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200">Product</th>
                            <th className="py-2 px-4 bg-gray-200">Quantity</th>
                            <th className="py-2 px-4 bg-gray-200">Price</th>
                            <th className="py-2 px-4 bg-gray-200">Total</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {cart
                            .filter((cartItem) =>
                                checkedItems.includes(cartItem.cartid)
                            )
                            .map((cartItem) => {
                                // Find the corresponding food item using foodmenuid
                                const foodItem = foods.find(
                                    (food) =>
                                        food.foodmenuid === cartItem.foodmenuid
                                );

                                // Find the corresponding food price using foodmenuid
                                const foodPrice = foodPrices.find(
                                    (price) =>
                                        price.foodmenuid === cartItem.foodmenuid
                                );

                                return (
                                    <tr key={cartItem.cartid}>
                                        <td className="py-2 px-4">
                                            {foodItem
                                                ? foodItem.foodmenuname
                                                : ""}
                                        </td>
                                        <td className="py-2 px-4">
                                            {updatedQuantity[cartItem.cartid] ||
                                                cartItem.quantity}
                                        </td>
                                        <td className="py-2 px-4">
                                            {foodPrice
                                                ? parseFloat(
                                                      foodPrice.foodmenuprice
                                                  ).toFixed(2)
                                                : 0.0}
                                        </td>
                                        <td className="py-2 px-4">
                                            {(updatedQuantity[
                                                cartItem.cartid
                                            ] || cartItem.quantity) *
                                                (foodPrice
                                                    ? parseFloat(
                                                          foodPrice.foodmenuprice
                                                      )
                                                    : 0.0)}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody> */}
                    <tbody>
                        <tr>
                            <td className="py-2 px-4">Lechon Manok</td>
                            <td className="py-2 px-4">1</td>
                            <td className="py-2 px-4">123.00</td>
                            <td className="py-2 px-4">123.00</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4">Fried Chicken</td>
                            <td className="py-2 px-4">1</td>
                            <td className="py-2 px-4">44.00</td>
                            <td className="py-2 px-4">44.00</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="py-2 px-4" colSpan="3">
                                Total
                            </th>
                            {/* <td className="py-2 px-4">
                                {cart
                                    .filter((cartItem) =>
                                        checkedItems.includes(cartItem.cartid)
                                    )
                                    .reduce(
                                        (total, cartItem) =>
                                            total +
                                            (updatedQuantity[cartItem.cartid] ||
                                                cartItem.quantity) *
                                                (foodPrices.find(
                                                    (price) =>
                                                        price.foodmenuid ===
                                                        cartItem.foodmenuid
                                                )
                                                    ? parseFloat(
                                                          foodPrices.find(
                                                              (price) =>
                                                                  price.foodmenuid ===
                                                                  cartItem.foodmenuid
                                                          ).foodmenuprice
                                                      ).toFixed(2)
                                                    : 0.0),
                                        0
                                    )}
                            </td> */}

                            <td className="py-2 px-4">167.00</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="flex justify-between">
                    <select className=" border border-gray-300 rounded py-2 px-4  border-dashboard">
                        <option selected>
                            Bauan Branch, Bauan, Batangas, Philippines
                        </option>
                        <option>
                            Lipa Branch, Lipa, Batangas, Philippines
                        </option>
                        <option>
                            Batangas City Branch, Batangas City, Batangas,
                            Philippines
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
