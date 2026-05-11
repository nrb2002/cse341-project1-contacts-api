//Import dependencies
const express = require('express'); //For building the server with Express.js framework
const cors = require('cors'); //For cross-origin resource sharing

//Import routes
const contactsRoutes = require('./routes/contacts.routes');
const swaggerRoutes = require('./routes/swagger.routes');
const router = require('./routes/');

//Set up server
const app = express();

app.use(cors());
app.use(express.json());

//Use routes
app.use('/', router); //Get default route
app.use('/contacts', contactsRoutes); //Get Contacts route
app.use('/api-docs', swaggerRoutes); //Get API documentation's route

module.exports = app;