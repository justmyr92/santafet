//implement route with no controller

const express = require("express");
const router = express.Router();
const pool = require("../db/sfm_db");
const bcrypt = require("bcrypt");
const path = require("path");

const multer = require("multer");

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: "../src/assets/foods",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

// router.get("/", (req, res) => {
//     res.send("Hello World!");
// });

//add food item
router.post("/food/add", async (req, res) => {
    try {
        const {
            foodMenuID,
            foodMenuName,
            foodMenuDescription,
            foodMenuCategory,
            foodMenuImage,
        } = req.body;

        const newFood = await pool.query(
            "INSERT INTO foodMenuTable (foodMenuID, foodMenuName, foodMenuDescription, foodMenuCategory, foodMenuImage) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                foodMenuID,
                foodMenuName,
                foodMenuDescription,
                foodMenuCategory,
                foodMenuImage,
            ]
        );

        res.json(newFood.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/food/price/add", async (req, res) => {
    try {
        const { foodMenuID, foodMenuPrice, foodMenuCutType, branchID } =
            req.body;

        let foodPriceID =
            "SFMP" + Math.floor(Math.random() * 99999999) + 10000000;

        console.log(req.body);

        const newFoodPrice = await pool.query(
            "INSERT INTO foodMenuPriceTable (foodMenuPriceID, foodMenuID, foodMenuPrice, foodMenuCutType, branchID) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [foodPriceID, foodMenuID, foodMenuPrice, foodMenuCutType, branchID]
        );

        console.log("Tangina", req.body);

        res.json(newFoodPrice.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//select count customer
router.get("/customer/count", async (req, res) => {
    try {
        const countCustomer = await pool.query(
            "SELECT COUNT(*) FROM customerTable"
        );
        res.json(countCustomer.rows[0]);
        console.log(countCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get foods
router.get("/food", async (req, res) => {
    try {
        const allFood = await pool.query("SELECT * FROM foodMenuTable");
        res.json(allFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get food price
router.get("/food/price", async (req, res) => {
    try {
        const allFoodPrice = await pool.query(
            "SELECT * FROM foodMenuPriceTable"
        );
        res.json(allFoodPrice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get food by ids
router.get("/food/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allFood = await pool.query(
            "SELECT * FROM foodMenuTable WHERE foodMenuCategory = $1",
            [id]
        );
        res.json(allFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//select foodmenuprices by foodmenuid
router.get("/food/price/:id/:bid", async (req, res) => {
    try {
        const { id, bid } = req.params;
        const allFoodPrice = await pool.query(
            "SELECT * FROM foodMenuPriceTable WHERE foodMenuID = $1 AND branchID = $2",
            [id, bid]
        );
        res.json(allFoodPrice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//edit price of food
router.patch("/food/price/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { foodMenuPrice } = req.body;
        const updateFoodPrice = await pool.query(
            "UPDATE foodMenuPriceTable SET foodMenuPrice = $1 WHERE foodMenuPriceID = $2",
            [foodMenuPrice, id]
        );
        res.json("Food price was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/food/price", async (req, res) => {
    try {
        const allFoodPrice = await pool.query(
            "SELECT * FROM foodMenuPriceTable",
            [id]
        );
        res.json(allFoodPrice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/food/search/:search", async (req, res) => {
    try {
        const { search } = req.params;
        const allFood = await pool.query(
            "SELECT * FROM foodMenuTable WHERE LOWER(foodMenuName) LIKE LOWER($1) OR LOWER(foodMenuDescription) LIKE LOWER($1) OR LOWER(foodMenuCategory) LIKE LOWER($1) OR LOWER(foodMenuID) LIKE LOWER($1)",
            ["%" + search + "%"]
        );
        res.json(allFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get admin by id
router.get("/admin/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAdmin = await pool.query(
            "SELECT * FROM adminTable WHERE adminID = $1",
            [id]
        );
        res.json(allAdmin.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//count food
router.get("/food/count", async (req, res) => {
    try {
        const countFood = await pool.query(
            "SELECT COUNT(*) FROM foodMenuTable"
        );
        res.json(countFood.rows[0]);
        console.log(countFood.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get customer order item
router.get("/order/item/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allOrderItem = await pool.query(
            //inner join to get food name customer order item to food menu table and food menu price table
            "SELECT * FROM customerOrderItemTable INNER JOIN foodMenuTable ON customerOrderItemTable.foodMenuID = foodMenuTable.foodMenuID INNER JOIN foodMenuPriceTable ON customerOrderItemTable.foodMenuPriceID = foodMenuPriceTable.foodMenuPriceID WHERE customerOrderID = $1",
            [id]
        );
        res.json(allOrderItem.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get ordrs count

router.get("/order/count/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const countOrder = await pool.query(
            "SELECT COUNT(*) FROM customerOrderTable where branchID = $1",
            [id]
        );
        res.json(countOrder.rows[0]);
        console.log(countOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get orders where status is success
router.get("/order/success/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allOrder = await pool.query(
            "SELECT SUM(customerOrderTotalPrice) FROM customerOrderTable WHERE customerOrderStatus = 'Completed' AND branchID = $1",
            [id]
        );
        console.log(allOrder.rows[0], "asd");
        res.json(allOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get products count
router.get("/product/count", async (req, res) => {
    try {
        const countProduct = await pool.query(
            "SELECT COUNT(*) FROM foodMenuTable"
        );
        res.json(countProduct.rows[0]);
        console.log(countProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get orders where status is success
router.get("/order/total", async (req, res) => {
    try {
        const countOrder = await pool.query(
            "SELECT COUNT(*) FROM customerOrderTable WHERE customerOrderStatus = 'Success'"
        );
        res.json(countOrder.rows[0]);
        console.log(countOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//add to cart
router.post("/cart/add", async (req, res) => {
    try {
        const { cartID, customerID, foodMenuID, foodMenuPriceID, quantity } =
            req.body;
        const newCart = await pool.query(
            "INSERT INTO cartTable (cartID, customerID, foodMenuID, foodMenuPriceID, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [cartID, customerID, foodMenuID, foodMenuPriceID, quantity]
        );

        res.json(newCart.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.patch("/order/process/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, deliverytime } = req.body;
        console.log(req.body);
        let query = "";
        let values = [];
        // if (deliveryTime !== "" && status === "Out for delivery") {
        //     query =
        //         "UPDATE customerOrderTable SET customerOrderStatus = $1, estimated_delivery_time = $2 WHERE customerOrderID = $3";
        //     values = [status, deliveryTime, id];
        // } else if (status === "Completed" && deliveryTime === "") {
        //     query =
        //         "UPDATE customerOrderTable SET customerOrderStatus = $1, customerOrderPaymentStatus = $2 WHERE customerOrderID = $3";
        //     values = [status, "Paid", id];
        // } else {
        //     query =
        //         "UPDATE customerOrderTable SET customerOrderStatus = $1 WHERE customerOrderID = $2";
        //     values = [status, id];
        // }

        if (status === "Completed" && deliverytime === "") {
            query =
                "UPDATE customerOrderTable SET customerOrderStatus = $1, customerOrderPaymentStatus = $2 WHERE customerOrderID = $3";
            values = [status, "Paid", id];
            console.log("1");
        } else if (status === "Out for Delivery" && deliverytime !== "") {
            query =
                "UPDATE customerOrderTable SET customerOrderStatus = $1, estimated_delivery_time = $2 WHERE customerOrderID = $3";
            values = [status, deliverytime, id];
            console.log("2");
        } else {
            query =
                "UPDATE customerOrderTable SET customerOrderStatus = $1 WHERE customerOrderID = $2";
            values = [status, id];
            console.log("3");
        }

        const updateOrder = await pool.query(query, values);
        res.json("Order was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//get cart
router.get("/cart/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allCart = await pool.query(
            "SELECT * FROM cartTable WHERE customerID = $1",
            [id]
        );
        res.json(allCart.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//delete cart
router.delete("/cart/delete/item/:cartid", async (req, res) => {
    try {
        const { cartid } = req.params;
        const deleteCart = await pool.query(
            "DELETE FROM cartTable WHERE cartID = $1",
            [cartid]
        );
        res.json("Cart was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/cart/delete/all/:customerid", async (req, res) => {
    try {
        const { customerid } = req.params;
        const deleteCart = await pool.query(
            "DELETE FROM cartTable WHERE customerID = $1",
            [customerid]
        );
        res.json("Cart was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//get cart inner join food menu and food menu price
router.get("/cart/inner/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allCart = await pool.query(
            "SELECT * FROM cartTable INNER JOIN foodMenuTable ON cartTable.foodMenuID = foodMenuTable.foodMenuID INNER JOIN foodMenuPriceTable ON cartTable.foodMenuPriceID = foodMenuPriceTable.foodMenuPriceID WHERE customerID = $1",
            [id]
        );
        res.json(allCart.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/cart/inner/:id/:branchid", async (req, res) => {
    try {
        const { id, branchid } = req.params;
        const allCart = await pool.query(
            "SELECT * FROM cartTable INNER JOIN foodMenuTable ON cartTable.foodMenuID = foodMenuTable.foodMenuID INNER JOIN foodMenuPriceTable ON cartTable.foodMenuPriceID = foodMenuPriceTable.foodMenuPriceID WHERE customerID = $1 AND branchID = $2",
            [id, branchid]
        );
        res.json(allCart.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add address
router.post("/address/add", async (req, res) => {
    let customerAddressID =
        "SFMA" + Math.floor(Math.random() * 99999999) + 10000000;

    try {
        const {
            customerID,
            customerFullName,
            customerContactNumber,
            customerStreet,
            customerBarangay,
            customerCity,
            customerNotes,
            customerAddressLabel,
            customerAddressDefault,
            addressLatitude,
            addressLongitude,
        } = req.body;
        const newAddress = await pool.query(
            "INSERT INTO customerAddressTable (customerAddressID, customerID, customerFullName, customerContactNumber, customerStreet, customerBarangay, customerCity, customerNotes, customerAddressLabel, customerAddressDefault, addressLatitude, addressLongitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12) RETURNING *",
            [
                customerAddressID,
                customerID,
                customerFullName,
                customerContactNumber,
                customerStreet,
                customerBarangay,
                customerCity,
                customerNotes,
                customerAddressLabel,
                customerAddressDefault,
                addressLatitude,
                addressLongitude,
            ]
        );

        res.json(newAddress.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get address
router.get("/address/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAddress = await pool.query(
            "SELECT * FROM customerAddressTable WHERE customerID = $1",
            [id]
        );
        res.json(allAddress.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//login
router.post("/customer/login", async (req, res) => {
    try {
        const { customerContactNumber, customerPassword } = req.body;

        const user = await pool.query(
            "SELECT * FROM customerTable WHERE customerContactNumber = $1 OR customerEmailAdress = $1",
            [customerContactNumber]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matched = await bcrypt.compare(
            customerPassword,
            user.rows[0].customerpassword
        );

        if (!matched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/customer/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allCustomer = await pool.query(
            "SELECT * FROM customerTable WHERE customerID = $1",
            [id]
        );
        res.json(allCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
router.post("/superadmin/login", async (req, res) => {
    try {
        const { superadminContactNumber, superadminPassword } = req.body;

        const superadmin = await pool.query(
            "SELECT * FROM superadmin WHERE superadmincontactnumber = $1 OR superadminemailaddress = $1",
            [superadminContactNumber]
        );

        console.log(superadmin);

        if (!superadmin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matched = await bcrypt.compare(
            superadminPassword,
            superadmin.rows[0].superadminpassword
        );

        if (!matched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json(superadmin.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/admin/login", async (req, res) => {
    try {
        const { adminContactNumber, adminPassword } = req.body;

        const user = await pool.query(
            "SELECT * FROM adminTable WHERE admincontactnumber = $1 OR adminemailaddress = $1",
            [adminContactNumber]
        );

        console.log(user.rows);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const matched = await bcrypt.compare(
            adminPassword,
            user.rows[0].adminpassword
        );
        console.log(adminPassword, user.rows[0].adminpassword);
        if (!matched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        console.log(user.rows[0].is_active);
        if (user.rows[0].is_active === "inactive") {
            return res.status(401).json({ message: "Account is not active" });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

//register
router.post("/customer/register", async (req, res) => {
    try {
        const {
            customerID,
            customerFirstName,
            customerLastName,
            customerEmailAdress,
            customerPassword,
            customerContactNumber,
            userRoleID,
        } = req.body;

        console.log(req.body);

        // Check if user exists (if email is already registered)
        const user = await pool.query(
            "SELECT * FROM customerTable WHERE customerEmailAdress = $1 OR customerContactNumber = $2",
            [customerEmailAdress, customerContactNumber]
        );

        console.log(user.rows);

        if (user.rows.length > 0) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(customerPassword, 10);

        const newUser = await pool.query(
            "INSERT INTO customerTable (customerID, customerFirstName, customerLastName, customerEmailAdress, customerPassword, customerContactNumber, userRoleID) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                customerID,
                customerFirstName,
                customerLastName,
                customerEmailAdress,
                hashedPassword, // Use the hashed password
                customerContactNumber,
                userRoleID,
            ]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.patch("/customer/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customerFirstName,
            customerLastName,
            customerEmailAdress,
            customerContactNumber,
        } = req.body;
        const updateCustomer = await pool.query(
            "UPDATE customerTable SET customerFirstName = $1, customerLastName = $2, customerEmailAdress = $3, customerContactNumber = $4 WHERE customerID = $5",
            [
                customerFirstName,
                customerLastName,
                customerEmailAdress,
                customerContactNumber,
                id,
            ]
        );
        res.json("Customer was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/order/best", async (req, res) => {
    console.log(req);
    try {
        const mosstFood = await pool.query(
            "SELECT foodMenuID, COUNT(*) FROM customerOrderItemTable GROUP BY foodMenuID ORDER BY COUNT(*) DESC LIMIT 3"
        );

        console.log("Query result:", mosstFood.rows);

        return res.status(200).json(mosstFood.rows);
        // res.json(mosstFood.rows);

        // res.json({ message: "Hello world" });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Internal Server Error");
    }
});
//get all customer
router.patch("/cart/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updateCart = await pool.query(
            "UPDATE cartTable SET quantity = $1 WHERE cartID = $2",
            [quantity, id]
        );
        res.json("Cart was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/customer", async (req, res) => {
    try {
        const allCustomer = await pool.query("SELECT * FROM customerTable");
        res.json(allCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get customer by id
router.get("/customer/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allCustomer = await pool.query(
            "SELECT * FROM customerTable WHERE customerID = $1",
            [id]
        );
        res.json(allCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//customer search by all fields and doest not include password and userRoleID and not case sensitive
router.get("/customer/search/:search", async (req, res) => {
    try {
        const { search } = req.params;
        const allCustomer = await pool.query(
            "SELECT * FROM customerTable WHERE LOWER(customerFirstName) LIKE LOWER($1) OR LOWER(customerLastName) LIKE LOWER($1) OR LOWER(customerEmailAdress) LIKE LOWER($1) OR LOWER(customerContactNumber) LIKE LOWER($1)",
            ["%" + search + "%"]
        );
        res.json(allCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.patch("/food/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // else {
        //     updatedFoodData = {
        //         foodmenuname: foodName,
        //         foodmenudescription: foodMenuDescription,
        //         foodmenucategory: foodMenuCategory,
        //         foodmenuimage: "",
        //     };
        // }
        const {
            foodmenuname,
            foodmenudescription,
            foodmenucategory,
            foodmenuimage,
        } = req.body;

        let sql = "";
        let values = [];

        if (foodmenuimage === "") {
            sql =
                "UPDATE foodMenuTable SET foodMenuName = $1, foodMenuDescription = $2, foodMenuCategory = $3 WHERE foodMenuID = $4";
            values = [foodmenuname, foodmenudescription, foodmenucategory, id];
        } else {
            sql =
                "UPDATE foodMenuTable SET foodMenuName = $1, foodMenuDescription = $2, foodMenuCategory = $3, foodMenuImage = $4 WHERE foodMenuID = $5";
            values = [
                foodmenuname,
                foodmenudescription,
                foodmenucategory,
                foodmenuimage,
                id,
            ];
        }

        const updateFood = await pool.query(sql, values);
        res.json("Food was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/admin", async (req, res) => {
    try {
        const allAdmin = await pool.query("SELECT * FROM adminTable");
        res.json(allAdmin.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/branch", async (req, res) => {
    try {
        const allBranch = await pool.query("SELECT * FROM branchTable");
        res.json(allBranch.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.patch("/address/update", async (req, res) => {
    // {
    //     "customeraddressid": "SFMA5238548110000000",
    //     "customerid": "C56463520",
    //     "customerfullname": "Justmyr Gutierrez",
    //     "customercontactnumber": "09063488667",
    //     "customerstreet": "Sitio 7",
    //     "customerbarangay": "Balete Relocation Site",
    //     "customercity": "Batangas City",
    //     "customernotes": "3",
    //     "customeraddresslabel": "work",
    //     "customeraddressdefault": true,
    //     "addresslatitude": "13.81907555",
    //     "addresslongitude": "121.06428337048469"
    // }

    try {
        const {
            customeraddressid,
            customerid,
            customerfullname,
            customercontactnumber,
            customerstreet,
            customerbarangay,
            customercity,
            customernotes,
            customeraddresslabel,
            customeraddressdefault,
            addresslatitude,
            addresslongitude,
        } = req.body;
        const updateAddress = await pool.query(
            //update only barangay, city, notes, label no need to update default
            "UPDATE customerAddressTable SET customerstreet = $1, customerbarangay = $2, customercity = $3, customernotes = $4 WHERE customerAddressID = $5",
            [
                customerstreet,
                customerbarangay,
                customercity,
                customernotes,
                customeraddressid,
            ]
        );
        res.json("Address was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/branch", async (req, res) => {
    try {
        const branchid = Math.floor(Math.random() * 99999999) + 10000000;
        const {
            branchname,
            branchlocationaddress,
            branchlatitude,
            branchlongitude,
        } = req.body;
        const newBranch = await pool.query(
            "INSERT INTO branchTable (branchID, branchName, branchlocationaddress, branchlatitude, branchlongitude) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                branchid,
                branchname,
                branchlocationaddress,
                branchlatitude,
                branchlongitude,
            ]
        );

        res.json(newBranch.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/rider/add", async (req, res) => {
    try {
        const {
            deliverypersonid,
            deliverypersonfirstname,
            deliverypersonlastname,
            deliverypersonemailaddress,
            deliverypersonpassword,
            deliverypersoncontactnumber,
            userroleid,
            branchid,
        } = req.body;

        console.log(req.body);

        const hashedPassword = await bcrypt.hash(deliverypersonpassword, 10);
        console.log(hashedPassword);

        const newRider = await pool.query(
            "INSERT INTO deliveryPersonTable (deliveryPersonID, deliveryPersonFirstName, deliveryPersonLastName, deliveryPersonEmailAdress, deliveryPersonPassword, deliveryPersonContactNumber, userRoleID, branchID) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                deliverypersonid,
                deliverypersonfirstname,
                deliverypersonlastname,
                deliverypersonemailaddress,
                hashedPassword,
                deliverypersoncontactnumber,
                userroleid,
                branchid,
            ]
        );

        res.json(newRider.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/rider", async (req, res) => {
    try {
        const allRider = await pool.query("SELECT * FROM deliveryPersonTable");
        res.json(allRider.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/order/add", async (req, res) => {
    try {
        const {
            customerorderid,
            customerid,
            customeraddressid,
            customerorderdate,
            customerorderstatus,
            customerordertotalprice,
            customerorderpaymentmethod,
            customerorderpaymentstatus,
            deliverypersonid,
            estimated_delivery_time,
            order_method,
        } = req.body;

        // Add code to insert the order into your database here
        const newOrder = await pool.query(
            "INSERT INTO customerOrderTable (customerOrderID, customerID, customerAddressID, customerOrderDate, customerOrderStatus, customerOrderTotalPrice, customerOrderPaymentMethod, customerOrderPaymentStatus, branchId, estimated_delivery_time, order_method) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11) RETURNING *",
            [
                customerorderid,
                customerid,
                customeraddressid,
                customerorderdate,
                customerorderstatus,
                customerordertotalprice,
                customerorderpaymentmethod,
                customerorderpaymentstatus,
                deliverypersonid,
                estimated_delivery_time,
                order_method,
            ]
        );

        // Assuming successful insertion
        res.json({ message: "Order submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/order", async (req, res) => {
    try {
        const allOrder = await pool.query(
            "SELECT * FROM customerOrderTable order by customerorderstatus ASC"
        );
        res.json(allOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/orders/:branchid", async (req, res) => {
    try {
        const { branchid } = req.params;
        const allOrder = await pool.query(
            "SELECT * FROM customerOrderTable WHERE branchID = $1",
            [branchid]
        );
        res.json(allOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allOrder = await pool.query(
            "SELECT * FROM customerOrderTable WHERE customerID = $1",
            [id]
        );
        res.json(allOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/order/item/add", async (req, res) => {
    try {
        const {
            customerorderitemid,
            customerorderid,
            foodmenuid,
            foodmenupriceid,
            customerorderitemquantity,
            customerorderitemtotalprice,
        } = req.body;

        // Add code to insert the order item into your database here
        const newOrderItem = await pool.query(
            "INSERT INTO customerOrderItemTable (customerOrderItemID, customerOrderID, foodMenuID, foodMenuPriceID, customerOrderItemQuantity, customerOrderItemTotalPrice) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                customerorderitemid,
                customerorderid,
                foodmenuid,
                foodmenupriceid,
                customerorderitemquantity,
                customerorderitemtotalprice,
            ]
        );

        res.json(newOrderItem.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//remove cart item by customer
router.delete("/customer/cart/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCart = await pool.query(
            "DELETE FROM cartTable WHERE customerID = $1",
            [id]
        );
        res.json("Cart was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//encrypt password
router.get("/customer/encrypt/", async (req, res) => {
    try {
        const password = [
            {
                id: "A001",
                password: "password123",
            },
            {
                id: "A002",
                password: "password234",
            },
            {
                id: "A003",
                password: "password345",
            },
            {
                id: "A004",
                password: "password456",
            },
            {
                id: "A005",
                password: "password578",
            },
        ];

        for (let i = 0; i < password.length; i++) {
            const hashedPassword = await bcrypt.hash(password[i].password, 10);
            const updatePassword = await pool.query(
                "UPDATE adminTable SET adminPassword = $1 WHERE adminID = $2",
                [hashedPassword, password[i].id]
            );
        }

        res.json("Password was encrypted!");
    } catch (err) {
        console.error(err.message);
    }
});
router.get("/about", (req, res) => {
    res.send("About Page");
});
router.post("/superadmin", async (req, res) => {
    try {
        const {
            superadminid,
            superadminfirstname,
            superadminlastname,
            superadminemailaddress,
            superadminpassword,
            superadmincontactnumber,
            userroleid,
        } = req.body;

        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(superadminpassword, 10);

        const newSuperAdmin = await pool.query(
            "INSERT INTO superadmin (superadminid, superadminfirstname, superadminlastname, superadminemailaddress, superadminpassword, superadmincontactnumber, userroleid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                superadminid,
                superadminfirstname,
                superadminlastname,
                superadminemailaddress,
                hashedPassword, // Use the hashed password
                superadmincontactnumber,
                userroleid,
            ]
        );

        res.json(newSuperAdmin.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/admins", async (req, res) => {
    const adminid = Math.floor(Math.random() * 99999999) + 10000000;
    const {
        adminfirstname,
        adminlastname,
        adminemailaddress,
        adminpassword,
        admincontactnumber,
        userroleid,
        branchid,
        is_active,
    } = req.body;

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(adminpassword, 10);

    try {
        const result = await pool.query(
            "INSERT INTO admintable (adminid, adminfirstname, adminlastname, adminemailaddress, adminpassword, admincontactnumber, userroleid, branchid , is_active) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
                adminid,
                adminfirstname,
                adminlastname,
                adminemailaddress,
                hashedPassword, // Use the hashed password
                admincontactnumber,
                userroleid,
                branchid,
                is_active,
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get all branch ids
router.get("/branch/ids", async (req, res) => {
    try {
        const allBranch = await pool.query("SELECT branchID FROM branchTable");
        res.json(allBranch.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/availability/add", async (req, res) => {
    try {
        const { availabilityid, branchid, foodmenuid, available } = req.body;
        const newAvailability = await pool.query(
            "INSERT INTO productavailabilitytable (availabilityid, branchid, foodMenuid, available) VALUES($1, $2, $3, $4) RETURNING *",
            [availabilityid, branchid, foodmenuid, available]
        );

        res.json(newAvailability.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/availability", async (req, res) => {
    try {
        const { branchid, foodMenuID } = req.body;
        console.log(req.body);
        const allAvailability = await pool.query(
            "SELECT * FROM productAvailabilityTable WHERE branchID = $1 AND foodMenuID = $2",
            [branchid, foodMenuID]
        );
        console.log(allAvailability.rows, "asd");
        res.status(200).json(allAvailability.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/availability/branch/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAvailability = await pool.query(
            "SELECT * FROM productAvailabilityTable WHERE branchID = $1",
            [id]
        );
        console.log(allAvailability.rows);
        res.json(allAvailability.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.patch("/availability/update", async (req, res) => {
    try {
        const { branchid, foodMenuID, available } = req.body;
        const updateAvailability = await pool.query(
            "UPDATE productAvailabilityTable SET available = $1 WHERE branchID = $2 AND foodMenuID = $3",
            [available, branchid, foodMenuID]
        );

        // Respond with the updated availability status
        res.status(200).json({
            available: available,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//count orders who is not completed
router.get("/order/count/notcompleted/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const countOrder = await pool.query(
            "SELECT COUNT(customerOrderID) FROM customerOrderTable inner join adminTable on customerOrderTable.branchID = adminTable.branchID WHERE (customerOrderStatus != 'Completed' AND customerOrderStatus != 'Out for Delivery') AND adminTable.adminID = $1",
            [id]
        );
        res.json(countOrder.rows[0]);
        console.log(countOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/transaction_sum/:month", async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const { month } = req.params;
        const result = await pool.query(
            "SELECT SUM(customerordertotalprice) FROM customerordertable WHERE EXTRACT(MONTH FROM customerorderdate) = $1 AND EXTRACT(YEAR FROM customerorderdate) = $2 AND customerorderstatus = 'Completed'",

            [month, year]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/order/most/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const mostFood = await pool.query(
            //inner join customer order table to customer order item table
            "SELECT foodMenuID, COUNT(*), SUM(customerorderitemquantity) FROM customerOrderItemTable INNER JOIN customerOrderTable ON customerOrderItemTable.customerOrderID = customerOrderTable.customerOrderID WHERE customerOrderTable.customerID = $1 GROUP BY foodMenuID ORDER BY COUNT(*) DESC LIMIT 3",

            [id]
        );
        res.json(mostFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all sales, and order count of all branches by current year
router.get("/sales/branch", async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const allSales = await pool.query(
            // "SELECT SUM(customerOrderTotalPrice), COUNT(customerOrderID), branchName FROM customerOrderTable INNER JOIN branchTable ON customerOrderTable.branchID = branchTable.branchID WHERE EXTRACT(YEAR FROM customerOrderDate) = $1 GROUP BY branchName",
            //"SELECT branchTable.branchName, COALESCE(SUM(customerOrderTable.customerOrderTotalPrice), 0) AS totalSales, COALESCE(COUNT(customerOrderTable.customerOrderID), 0) AS orderCount FROM branchTable LEFT JOIN customerOrderTable ON branchTable.branchID = customerOrderTable.branchID AND EXTRACT(YEAR FROM customerOrderTable.customerOrderDate) = EXTRACT(YEAR FROM NOW()) Where customerOrderTable.customerOrderStatus = 'Completed' GROUP BY branchTable.branchName ORDER BY branchTable.branchName ASC"
            "SELECT branchTable.branchName, COALESCE(SUM(CASE WHEN customerOrderTable.customerOrderStatus = 'Completed' THEN customerOrderTable.customerOrderTotalPrice ELSE 0 END), 0) AS totalSales, COALESCE(COUNT(CASE WHEN customerOrderTable.customerOrderStatus = 'Completed' THEN customerOrderTable.customerOrderID ELSE NULL END), 0) AS orderCount FROM branchTable LEFT JOIN customerOrderTable ON branchTable.branchID = customerOrderTable.branchID AND EXTRACT(YEAR FROM customerOrderTable.customerOrderDate) = EXTRACT(YEAR FROM NOW()) GROUP BY branchTable.branchName ORDER BY totalSales DESC"

            // ,[year]
        );
        res.json(allSales.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//patch branch by name and address
router.patch("/branch/update", async (req, res) => {
    try {
        const { branchid, branchname, branchlocationaddress, is_active } =
            req.body;
        const updateBranch = await pool.query(
            "UPDATE branchTable SET branchName = $1, branchlocationaddress = $2, is_active = $3 WHERE branchID = $4",
            [branchname, branchlocationaddress, is_active, branchid]
        );
        res.json(updateBranch.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch(
//             `https://santafetaguktukan.online/api/admin/`, // Assuming there's a route to update a specific admin by ID
//             {
//                 method: "PATCH", // Use the appropriate HTTP method for updating
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(updateAdmin),
//             }
//         );
//         const data = await response.json();
//         console.log("Admin updated:", data);

//         setReload(true);
//     } catch (error) {
//         console.error("Error updating admin:", error);
//     }

//     setShowEditAdminModal(false);
// };

router.patch("/admin", async (req, res) => {
    try {
        // adminid: row.adminid,
        //         adminfirstname: row.adminfirstname,
        //         adminlastname: row.adminlastname,
        //         adminemailaddress: row.adminemailaddress,
        //         adminpassword: row.adminpassword,
        //         admincontactnumber: row.admincontactnumber,

        const {
            adminid,
            adminfirstname,
            adminlastname,
            adminemailaddress,
            admincontactnumber,
            is_active,
        } = req.body;
        const updateAdmin = await pool.query(
            "UPDATE adminTable SET adminfirstname = $1, adminlastname = $2, adminemailaddress = $3, admincontactnumber = $4 , is_active = $5 WHERE adminid = $6 returning *",
            [
                adminfirstname,
                adminlastname,
                adminemailaddress,
                admincontactnumber,
                is_active,
                adminid,
            ]
        );
        res.json(updateAdmin.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//fetch email from customer table
router.post("/customer/email", async (req, res) => {
    try {
        const { email } = req.body;
        const allCustomer = await pool.query(
            "SELECT customerEmailAdress, customerFirstName FROM customerTable WHERE customerEmailAdress = $1",
            [email]
        );
        res.status(200).json(allCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// const body = { email, password };
// const response = await fetch(
//     "https://santafetaguktukan.online/api/customer/forgotpassword",
//     {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//     }
// );

router.patch("/customer/forgotpassword", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatePassword = await pool.query(
            "UPDATE customerTable SET customerPassword = $1 WHERE customerEmailAdress = $2",
            [hashedPassword, email]
        );
        res.status(200).json("Password was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete admin
router.delete("/admin/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAdmin = await pool.query(
            "DELETE FROM adminTable WHERE adminID = $1",
            [id]
        );
        res.json("Admin was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;

// Path: backend/routes/route.js
