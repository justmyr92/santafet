import React, { useEffect, useState } from "react";
//showModal={showAvailabilityModal} setShowModal={setShowAvailabilityModal} foodMenuID={row.foodmenuid} setReload={setReload}
const Available = ({ showModal, setShowModal, foodMenuID, setReload }) => {
    const [id, setId] = useState(localStorage.getItem("userID"));
    const [userRoleID, setUserRoleID] = useState(
        localStorage.getItem("userRoleID")
    );
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

    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        const fetchAvailability = async () => {
            const data1 = {
                branch: admin.branchid,
                foodMenu: foodMenuID,
            };
            try {
                const response = await fetch(
                    `https://santafetaguktukan.online/api/availability/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data1),
                    }
                );
                const data = await response.json();
                setAvailability(data);
            } catch (error) {
                console.error("Error fetching availability data:", error);
            }
        };

        fetchAvailability();

        console.log(availability);
    }, [foodMenuID, admin.branchid]); // Added foodMenuID and admin.branchid as a dependency

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            class="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full fixed inset-0 flex"
        >
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Availability
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                        >
                            <svg
                                class="w-3 h-3"
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
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4"></div>
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                        <button
                            data-modal-hide="default-modal"
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            I accept
                        </button>
                        <button
                            data-modal-hide="default-modal"
                            type="button"
                            class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Available;
