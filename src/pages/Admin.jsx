import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

const Users = () => {
    useEffect(() => {
        //get role from local storage
        const role = localStorage.getItem("userRoleID");

        if (role !== "STF") {
            window.location.href = "/login";
        }
    }, []);

    const [admins, setAdmins] = useState([]);
    const [branches, setBranches] = useState([]);
    const [newAdmin, setNewAdmin] = useState({
        adminfirstname: "",
        adminlastname: "",
        adminemailaddress: "",
        adminpassword: "",
        admincontactnumber: "",
        userroleid: "ADM", // Assuming a default role ID of "ADM
        branchid: 1, // Assuming a default branch ID
    });
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch("http://localhost:7722/admin");
                const data = await response.json();
                setAdmins(data);
            } catch (error) {
                console.error("Error fetching admins:", error);
            }
        };

        const fetchBranches = async () => {
            try {
                const response = await fetch("http://localhost:7722/branch");
                const data = await response.json();
                setBranches(data);
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        fetchAdmins();
        fetchBranches();
    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.adminid,
            sortable: true,
        },
        {
            name: "First Name",
            selector: (row) => row.adminfirstname,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.adminlastname,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.adminemailaddress,
            sortable: true,
        },
        {
            name: "Contact Number",
            selector: (row) => row.admincontactnumber,
            sortable: true,
        },
    ];

    const handleInputChange = (e) => {
        setNewAdmin({
            ...newAdmin,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:7722/admins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAdmin),
            });
            const data = await response.json();
            console.log("New admin added:", data);
            setAdmins([...admins, data]); // Update the admin list with the new admin
            setNewAdmin({
                adminfirstname: "",
                adminlastname: "",
                adminemailaddress: "",
                adminpassword: "",
                admincontactnumber: "",
                userroleid: 1, // Reset to default role ID
                branchid: 1, // Reset to default branch ID
            });
            setShowAddAdminModal(false);
        } catch (error) {
            console.error("Error adding new admin:", error);
        }
    };

    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    return (
        <section>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Users</h2>
                        <button
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="button"
                            onClick={() => setShowAddAdminModal(true)}
                        >
                            Add Admin
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={admins}
                        pagination
                        highlightOnHover
                        responsive
                    />
                </div>
            </div>

            {showAddAdminModal && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
                    onClick={() => setShowAddAdminModal(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold mb-4">
                            Add Admin
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                    <label
                                        htmlFor="adminfirstname"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="adminfirstname"
                                        name="adminfirstname"
                                        value={newAdmin.adminfirstname}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="adminlastname"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="adminlastname"
                                        name="adminlastname"
                                        value={newAdmin.adminlastname}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                    <label
                                        htmlFor="adminemailaddress"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="adminemailaddress"
                                        name="adminemailaddress"
                                        value={newAdmin.adminemailaddress}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="adminpassword"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="adminpassword"
                                        name="adminpassword"
                                        value={newAdmin.adminpassword}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                    <label
                                        htmlFor="admincontactnumber"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        id="admincontactnumber"
                                        name="admincontactnumber"
                                        value={newAdmin.admincontactnumber}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="branchid"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Branch
                                    </label>
                                    {/* Assuming a select input for branches */}
                                    <select
                                        id="branchid"
                                        name="branchid"
                                        value={newAdmin.branchid}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        required
                                    >
                                        {branches.map((branch) => (
                                            <option
                                                key={branch.branchid}
                                                value={branch.branchid}
                                            >
                                                {branch.branchname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                                    onClick={() => setShowAddAdminModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Users;
