const express = require("express");
const cors = require("cors");

const defaultRoute = require("./routes/index");
const contactsRoutes = require("./routes/contacts.routes");
const swaggerRoutes = require("./routes/swagger.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
});


// Default route
app.use("/", defaultRoute);

// Other routes
app.use("/contacts", contactsRoutes);
app.use("/api-docs", swaggerRoutes);

module.exports = app;
