import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const Branch = () => {
    useEffect(() => {
        //get role from local storage
        const role = localStorage.getItem("userRoleID");

        if (role !== "STF") {
            window.location.href = "/login";
        }
    }, []);
    const [branch, setBranch] = useState([]);
    const [newBranch, setNewBranch] = useState({
        branchname: "",
        branchlocationaddress: "",
        branchlatitude: "",
        branchlongitude: "",
    });

    const [reload, setReload] = useState(false); // Used to reload the data table after a change has been made to the database
    const [showAddBranchModal, setShowAddBranchModal] = useState(false);

    useEffect(() => {
        const branchFetch = async () => {
            const response = await fetch(`http://localhost:7722/branch`);
            const data = await response.json();
            setBranch(data);
        };
        branchFetch();
    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.branchid,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.branchname,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.branchlocationaddress,
            sortable: true,
        },
    ];
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        await setNewBranch((prevBranch) => ({
            ...prevBranch,
            [name]: value,
        }));

        if (value !== "") {
            const getLocation = async () => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
                    );
                    const data = await response.json();

                    if (data.length > 0) {
                        setNewBranch((prevBranch) => ({
                            ...prevBranch,
                            branchlatitude: data[0].lat,
                            branchlongitude: data[0].lon,
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching location:", error);
                }
            };

            getLocation();
        }
    };

    useEffect(() => {
        console.log(newBranch);
    }, [newBranch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:7722/branch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBranch),
            });
            const data = await response.json();
            console.log("New branch added:", data);
            setBranch([...branch, data]); // Update the branch list with the new branch
            setNewBranch({
                branchname: "",
                branchlocationaddress: "",
                branchlatitude: "",
                branchlongitude: "",
            });
        } catch (error) {
            console.error("Error adding new branch:", error);
        }

        setShowAddBranchModal(false);
    };

    return (
        <section>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Branch</h2>
                        <button
                            data-modal-target="default-modal"
                            data-modal-toggle="default-modal"
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="button"
                            onClick={() => setShowAddBranchModal(true)}
                        >
                            <FontAwesomeIcon
                                icon={faSquarePlus}
                                className="mr-2"
                            />
                            Add Branch
                        </button>
                    </div>
                    <div className="mt-4">
                        <DataTable
                            columns={columns}
                            data={branch}
                            pagination
                            highlightOnHover
                            responsive
                        />
                        {showAddBranchModal && (
                            <div
                                id="default-modal"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex absolute"
                            >
                                <div className="relative p-4 w-full max-w-2xl max-h-full">
                                    <div className="relative bg-white rounded-lg shadow">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                Add Branch
                                            </h3>
                                            <button
                                                type="button"
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                                data-modal-hide="default-modal"
                                                onClick={() =>
                                                    setShowAddBranchModal(false)
                                                }
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
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                                <span className="sr-only">
                                                    Close modal
                                                </span>
                                            </button>
                                        </div>
                                        <div className="p-4 md:p-5 space-y-4">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="branchname"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Branch Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="branchname"
                                                        name="branchname"
                                                        value={
                                                            newBranch.branchname
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="branchlocationaddress"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Branch Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="branchlocationaddress"
                                                        name="branchlocationaddress"
                                                        value={
                                                            newBranch.branchlocationaddress
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center justify-end">
                                                    <button
                                                        type="submit"
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                                        data-modal-hide="default-modal"
                                                        onClick={() =>
                                                            setShowAddBranchModal(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Branch;
