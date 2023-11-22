import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUtensils,
    faUser,
    faTable,
    faTruck,
    faSignOut,
    faMapMarked,
} from "@fortawesome/free-solid-svg-icons";

const links = [
    {
        icon: faHome,
        text: "Dashboard",
        route: "/dashboard",
    },
    {
        icon: faUtensils,
        text: "Foods",
        route: "/food",
    },
    {
        icon: faUser,
        text: "Customer",
        route: "/customer",
    },
    {
        icon: faTable,
        text: "Orders",
        route: "/order",
    },
    {
        icon: faTable,
        text: "Records",
        route: "/records",
    },
    {
        icon: faTruck,
        text: "Delivery",
        route: "/delivery",
    },
    {
        icon: faUser,
        text: "Riders",
        route: "/riders",
    },
    {
        icon: faMapMarked,
        text: "Branch",
        route: "/branch",
    },
    {
        icon: faUser,
        text: "Staff",
        route: "/staff",
    },
    {
        icon: faUser,
        text: "Admin",
        route: "/admin",
    },
];

const Sidebar = () => {
    const location = useLocation();

    const [id, setId] = useState(localStorage.getItem("userID"));
    const [userRoleID, setUserRoleID] = useState(
        localStorage.getItem("userRoleID")
    );
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

    const filterLinksByRole = (userRole) => {
        if (userRole === "STF") {
            return links.filter(
                (link) =>
                    link.text === "Dashboard" ||
                    link.text === "Customer" ||
                    link.text === "Branch" ||
                    link.text === "Foods" ||
                    link.text === "Admin"
            );
        } else if (userRole === "ADM") {
            return links.filter(
                (link) =>
                    link.text === "Dashboard" ||
                    link.text === "Customer" ||
                    link.text === "Orders" ||
                    link.text === "Foods"
            );
        } else {
            return [];
        }
    };

    const filteredLinks = filterLinksByRole(userRoleID);
    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-red-600">
            <div className="h-full px-3 py-4 overflow-y-auto">
                <img
                    src="../src/assets/logo.png"
                    alt="logo"
                    className="w-32 h-32 mx-auto mb-5"
                />
                <hr className="my-3" />

                <ul className="space-y-2 font-medium">
                    {filteredLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                to={link.route}
                                className={`flex items-center p-2 text-white rounded-lg hover:bg-red-500 group ${
                                    location.pathname === link.route
                                        ? "bg-yellow-400"
                                        : ""
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className="flex-shrink-0 w-5 h-5 text-white transition duration-75"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    {link.text}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li
                        className="flex items-center p-2 text-white rounded-lg hover:bg-red-500 group"
                        onClick={() => {
                            localStorage.removeItem("userID");
                            localStorage.removeItem("userRoleID");
                            window.location.reload();
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <FontAwesomeIcon
                            icon={faSignOut}
                            className="flex-shrink-0 w-5 h-5 text-white transition duration-75"
                        />
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
