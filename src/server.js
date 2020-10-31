require("dotenv/config");
require("./config/db");
var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");

var authRoutes = require("./routes/auth");
var adminRoutes = require("./routes/admin/auth");
var categoryRoutes = require("./routes/category");
var productRoutes = require("./routes/product");
var cartRoutes = require("./routes/cart");
var initialDataRoutes = require("./routes/admin/initialData");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user/cart", cartRoutes);
app.use("/api", initialDataRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
