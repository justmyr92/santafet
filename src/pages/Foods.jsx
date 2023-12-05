import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import AddFoodModal from "../components/AddFoodModal";
import UpdateFoodModal from "../components/UpdateFoodModal";
import Available from "../components/Available";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const Foods = () => {
    const [reload, setReload] = useState(false); // Used to reload the data table after a change has been made to the database
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

    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

    const [showAddFoodModal, setShowAddFoodModal] = useState(false);
    const [showUpdateFoodModal, setShowUpdateFoodModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState({});

    const [foods, setFoods] = useState([]);

    const [foodPrices, setFoodPrices] = useState([]);

    const handleClickedRow = (row) => {
        console.log(row);
        setSelectedFood(row);
        if (localStorage.getItem("userRoleID") === "STF") {
            setShowUpdateFoodModal(true);
        } else if (localStorage.getItem("userRoleID") === "ADM") {
            setShowAvailabilityModal(true);
        }
    };

    const columns = useMemo(() => [
        {
            name: "ID",
            selector: (row) => row.foodmenuid,
            sortable: true,
        },

        {
            name: "Image",
            selector: (row) => (
                <img
                    src={row.foodmenuimage}
                    alt={row.foodmenuname}
                    className="w-20"
                />
            ),
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.foodmenuname,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.foodmenudescription,
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.foodmenucategory,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex justify-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mx-1"
                        onClick={() => handleClickedRow(row)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </div>
            ),
        },
    ]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let apiUrl = "https://santafetaguktukan.online/api/food";

            if (search !== "") {
                apiUrl += `/search/${search}`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            const foodsWithDownloadURLs = await Promise.all(
                data.map(async (food) => {
                    const imageRef = ref(
                        storage,
                        `foods/${food.foodmenuimage}`
                    );

                    const downloadURL = await getDownloadURL(imageRef);
                    return { ...food, foodmenuimage: downloadURL };
                })
            );

            setFoods(foodsWithDownloadURLs);
        };

        fetchData();
        setReload(false);
    }, [reload, search]);
    return (
        <>
            <section>
                <Sidebar />
                {showAvailabilityModal && (
                    <Available
                        showModal={showAvailabilityModal}
                        setShowModal={setShowAvailabilityModal}
                        foodMenuID={selectedFood.foodmenuid}
                        setReload={setReload}
                    />
                )}
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                        <div className="header bg-white w-sm mb-4 flex justify-between items-center">
                            <h1 className="font-bold text-2xl">Foods</h1>
                            <div className="flex justify-between items-center bg-white w-sm gap-2">
                                <div className="search-container">
                                    <input
                                        type="search"
                                        id="food-search"
                                        className="block w-full py-2.5 px-4 text-sm rounded-none text-gray-900 rounded-lg bg-gray-50 border-gray-300 border outline-none"
                                        placeholder="Search foods..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                {localStorage.getItem("userRoleID") ===
                                    "STF" && (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        data-modal-target="add-food-modal"
                                        data-modal-toggle="add-food-modal"
                                        onClick={() =>
                                            setShowAddFoodModal(true)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faSquarePlus} />{" "}
                                        Add Food
                                    </button>
                                )}
                            </div>
                        </div>
                        <hr className="border-b-1 border-gray-300 my-2" />

                        <DataTable
                            columns={columns}
                            data={foods}
                            pagination
                            highlightOnHover
                        ></DataTable>
                    </div>
                </div>
            </section>
            {showAddFoodModal && (
                <AddFoodModal
                    showModal={showAddFoodModal}
                    setShowModal={setShowAddFoodModal}
                    setReload={setReload}
                />
            )}
            {showUpdateFoodModal && (
                <UpdateFoodModal
                    showModal={showUpdateFoodModal}
                    setShowModal={setShowUpdateFoodModal}
                    foodData={selectedFood}
                    setReload={setReload}
                />
            )}
        </>
    );
};

export default Foods;
