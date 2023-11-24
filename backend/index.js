const express = require("express");
const cors = require("cors");
const pool = require("./db/sfm_db");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

//multer
const multer = require("multer");
const path = require("path");
const { log } = require("console");

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

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//add food item
app.post("/food/add", upload.single("foodMenuImage"), async (req, res) => {
    try {
        const {
            foodMenuID,
            foodMenuName,
            foodMenuDescription,
            foodMenuCategory,
        } = req.body;

        console.log(req.body);
        console.log(req.file);
        const foodMenuImage = req.file.filename;
        console.log(foodMenuImage);

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

app.post("/food/price/add", async (req, res) => {
    try {
        const { foodMenuID, foodMenuPrice, foodMenuCutType } = req.body;

        let foodPriceID =
            "SFMP" + Math.floor(Math.random() * 99999999) + 10000000;

        console.log(req.body);

        const newFoodPrice = await pool.query(
            "INSERT INTO foodMenuPriceTable (foodMenuPriceID, foodMenuID, foodMenuPrice, foodMenuCutType) VALUES($1, $2, $3, $4) RETURNING *",
            [foodPriceID, foodMenuID, foodMenuPrice, foodMenuCutType]
        );

        console.log("Tangina", req.body);

        res.json(newFoodPrice.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//select count customer
app.get("/customer/count", async (req, res) => {
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
app.get("/food", async (req, res) => {
    try {
        const allFood = await pool.query("SELECT * FROM foodMenuTable");
        res.json(allFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get food price
app.get("/food/price", async (req, res) => {
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
app.get("/food/:id", async (req, res) => {
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

//get most frequent food ordered
app.get("/food/most", async (req, res) => {
    try {
        const mostFood = await pool.query(
            "SELECT foodMenuID, COUNT(*) FROM customerOrderItemTable GROUP BY foodMenuID ORDER BY COUNT(*) DESC LIMIT 1"
        );
        res.json(mostFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/food/favorite/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const favoriteFood = await pool.query(
            "SELECT foodMenuID, COUNT(*) FROM customerOrderItemTable WHERE customerID = $1 GROUP BY foodMenuID ORDER BY COUNT(*) DESC LIMIT 1",
            [id]
        );
        res.json(favoriteFood.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//select foodmenuprices by foodmenuid
app.get("/food/price/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allFoodPrice = await pool.query(
            "SELECT * FROM foodMenuPriceTable WHERE foodMenuID = $1",
            [id]
        );
        res.json(allFoodPrice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//edit price of food
app.patch("/food/price/update/:id", async (req, res) => {
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

app.get("/food/price", async (req, res) => {
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

//update food price
// {
//     "0": {
//         "foodmenupriceid": "SFMP4713337810000000",
//         "foodmenuid": "66038",
//         "foodmenuprice": "13.00",
//         "foodmenucuttype": "123123"
//     },
//     "1": {
//         "foodmenupriceid": "SFMP6934292310000000",
//         "foodmenuid": "66038",
//         "foodmenuprice": "12312.00",
//         "foodmenucuttype": "123"
//     },
//     "SFMP4713337810000000": {
//         "foodmenuprice": "13.001"
//     }
// }

//search food via name, description, category and id

app.get("/food/search/:search", async (req, res) => {
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
app.get("/admin/:id", async (req, res) => {
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
app.get("/food/count", async (req, res) => {
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
app.get("/order/item/:id", async (req, res) => {
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

app.get("/order/count/:id", async (req, res) => {
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
app.get("/order/success/:id", async (req, res) => {
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
app.get("/product/count", async (req, res) => {
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
app.get("/order/total", async (req, res) => {
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
app.post("/cart/add", async (req, res) => {
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

app.patch("/order/process/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, deliveryTime } = req.body;
        let query = "";
        let values = [];
        if (deliveryTime != "") {
            query =
                "UPDATE customerOrderTable SET customerOrderStatus = $1, estimated_delivery_time = $2 WHERE customerOrderID = $3";
            values = [status, deliveryTime, id];
        } else if (status === "Completed") {
            query =
                "UPDATE customerOrderTable SET customerOrderStatus = $1, customerOrderPaymentStatus = $2 WHERE customerOrderID = $3";
            values = [status, "Paid", id];
        } else {
            query =
                "UPDATE customerOrderTable SET customerOrderStatus = $1 WHERE customerOrderID = $2";
            values = [status, id];
        }
        const updateOrder = await pool.query(query, values);
        res.json("Order was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//get cart
app.get("/cart/:id", async (req, res) => {
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
app.delete("/cart/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCart = await pool.query(
            "DELETE FROM cartTable WHERE cartID = $1",
            [id]
        );
        res.json("Cart was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//add address
app.post("/address/add", async (req, res) => {
    // CREATE TABLE customerAddressTable (
    //     customerAddressID VARCHAR(20) PRIMARY KEY,
    //     customerID VARCHAR(20) REFERENCES customerTable(customerID),
    //     customerFullName VARCHAR(255),
    //     customerContactNumber VARCHAR(255),
    //     customerStreet VARCHAR(255),
    //     customerBarangay VARCHAR(255),
    //     customerCity VARCHAR(255),
    //     customerNotes TEXT,
    //     customerAddressLabel VARCHAR(255),
    //     customerAddressDefault BOOLEAN,
    //     addressLatitude DECIMAL(10, 15), -- Assuming latitude is stored as decimal number
    //     addressLongitude DECIMAL(10, 15) -- Assuming longitude is stored as decimal number
    // );
    //genetae random id from 10000000 to 99999999
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
app.get("/address/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAddress = await pool.query(
            "SELECT * FROM customerAddressTable WHERE customerID = $1",
            [id]
        );
        res.json(allAddress.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//login
app.post("/customer/login", async (req, res) => {
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

app.get("/customer/:id", async (req, res) => {
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
app.post("/superadmin/login", async (req, res) => {
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

app.post("/admin/login", async (req, res) => {
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

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

//register
app.post("/customer/register", async (req, res) => {
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

app.patch("/customer/update/:id", async (req, res) => {
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

//get all customer
app.patch("/cart/update/:id", async (req, res) => {
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

app.get("/customer", async (req, res) => {
    try {
        const allCustomer = await pool.query("SELECT * FROM customerTable");
        res.json(allCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get customer by id
app.get("/customer/:id", async (req, res) => {
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
app.get("/customer/search/:search", async (req, res) => {
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

app.patch("/food/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { foodMenuName, foodMenuDescription, foodMenuCategory } =
            req.body;
        const updateFood = await pool.query(
            "UPDATE foodMenuTable SET foodMenuName = $1, foodMenuDescription = $2, foodMenuCategory = $3 WHERE foodMenuID = $4",
            [foodMenuName, foodMenuDescription, foodMenuCategory, id]
        );
        res.json("Food was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/admin", async (req, res) => {
    try {
        const allAdmin = await pool.query("SELECT * FROM adminTable");
        res.json(allAdmin.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/branch", async (req, res) => {
    try {
        const allBranch = await pool.query("SELECT * FROM branchTable");
        res.json(allBranch.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/branch", async (req, res) => {
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

app.post("/rider/add", async (req, res) => {
    //     -- Create deliveryPersonTable
    // CREATE TABLE deliveryPersonTable (
    //     deliveryPersonID VARCHAR(20) PRIMARY KEY,
    //     deliveryPersonFirstName VARCHAR(255),
    //     deliveryPersonLastName VARCHAR(255),
    //     deliveryPersonEmailAdress VARCHAR(255),
    //     deliveryPersonPassword VARCHAR(255),
    //     deliveryPersonContactNumber VARCHAR(255),
    //     userRoleID VARCHAR(20) REFERENCES userRoleTable(userRoleID),
    //     branchID VARCHAR(20) REFERENCES branchTable(branchID) -- Linking delivery person to a specific branch
    // );
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

app.get("/rider", async (req, res) => {
    try {
        const allRider = await pool.query("SELECT * FROM deliveryPersonTable");
        res.json(allRider.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/order/add", async (req, res) => {
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

app.get("/order", async (req, res) => {
    try {
        const allOrder = await pool.query("SELECT * FROM customerOrderTable");
        res.json(allOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/orders/:branchid", async (req, res) => {
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

//select most frequent product ordered by customer
app.get("/order/most/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const mostOrder = await pool.query(
            //select *foods from foods tables base on first 3 most frequent food ordered by customer on customer order table and customer order item table
            "SELECT * FROM foodMenuTable WHERE foodMenuID IN (SELECT foodMenuID FROM customerOrderTable WHERE customerID = $1 GROUP BY foodMenuID ORDER BY COUNT(*) DESC LIMIT 2)",
            // "SELECT * FROM foodMenuTable WHERE foodMenuID IN ( SELECT foodMenuID FROM customerOrderTable WHERE customerID = $1 GROUP BY foodMenuID ORDER BY COUNT(*) DESC LIMIT 2",
            [id]
        );

        console.log(mostOrder.rows);

        res.json(mostOrder.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/order/:id", async (req, res) => {
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

app.post("/order/item/add", async (req, res) => {
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
app.delete("/customer/cart/delete/:id", async (req, res) => {
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
app.get("/customer/encrypt/", async (req, res) => {
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

app.post("/superadmin", async (req, res) => {
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

app.post("/admins", async (req, res) => {
    const adminid = Math.floor(Math.random() * 99999999) + 10000000;
    const {
        adminfirstname,
        adminlastname,
        adminemailaddress,
        adminpassword,
        admincontactnumber,
        userroleid,
        branchid,
    } = req.body;

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(adminpassword, 10);

    try {
        const result = await pool.query(
            "INSERT INTO admintable (adminid, adminfirstname, adminlastname, adminemailaddress, adminpassword, admincontactnumber, userroleid, branchid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                adminid,
                adminfirstname,
                adminlastname,
                adminemailaddress,
                hashedPassword, // Use the hashed password
                admincontactnumber,
                userroleid,
                branchid,
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get all branch ids
app.get("/branch/ids", async (req, res) => {
    try {
        const allBranch = await pool.query("SELECT branchID FROM branchTable");
        res.json(allBranch.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/availability/add", async (req, res) => {
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

app.post("/availability", async (req, res) => {
    try {
        const { branchid, foodmenuid } = req.body;
        const allAvailability = await pool.query(
            "SELECT productavailabilitytable FROM productavailabilitytable WHERE branchid = $1 AND foodMenuid = $2",
            [branchid, foodmenuid]
        );
        console.log(allAvailability.rows, req.body);
        res.json(allAvailability.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/transaction_sum/:month", async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const { month } = req.params;
        const result = await pool.query(
            "SELECT SUM(customerordertotalprice) FROM customerordertable WHERE EXTRACT(MONTH FROM customerorderdate) = $1 AND EXTRACT(YEAR FROM customerorderdate) = $2",

            [month, year]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(7722, () => {
    console.log("Server has started on port 7722");
});
