//Import dependencies
const express = require("express");
const router = express.Router();

//Import controller functions
const { 
    getContactById, 
    getAllContacts,
    createContact,
    updateContact,
    deleteContact 
} = require("../controllers/contacts.controller");

//Build each contact route

//Get Contacts Routes
router.get("/", getAllContacts);
router.get("/:id", getContactById);

//Create New Contact route
router.post("/", createContact);

//Update Contact route
router.put("/:id", updateContact);

//Delete Contact route
router.delete("/:id", deleteContact);


module.exports = router;
