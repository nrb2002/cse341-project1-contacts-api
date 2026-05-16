const contactsService = require("../services/contacts.service");

// GET all contacts
const getAllContacts = async (req, res) => {
  //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Get All Contacts"
  //#swagger.description="Pull all contacts from the database. "
  try {
    const contacts = await contactsService.getAllContacts();

    //#swagger.tags=[if (contacts.length === 0) { ]
    //#swagger.tags=[   return res.status(404).json({ message: "No contacts found" }); ]
    //#swagger.tags=[ } ]

    //Return the contacts
    res.status(200).json(contacts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// GET single contact
const getContactById = async (req, res) => {
  //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Get Single Contact"
  //#swagger.description="Pull one contact by ID from the database. "
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
  } */
  try {

    const contact = await contactsService.getContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found!"
      });
    }

    res.status(200).json(contact);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE contact
const createContact = async (req, res) => {
   //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Create New Contact"
  //#swagger.description="Insert new contact in the database. "
  /* #swagger.parameters["body"] = {
    in: "body",
    description: "Enter New Contact",
    required: true,
    schema: { 
      firstName: "John",
      lastName: "Doe",
      email: "john@domain.com",
      favoriteColor: "color",
      birthday: "Jan 1" 
    }
  } */
  try {

    const newContact =
      await contactsService.createContact(req.body);

    res.status(201).json(newContact);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE contact
const updateContact = async (req, res) => {
  //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Update Contact Info"
  //#swagger.description="Edit a specific contact and save update in database. "

  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
  } */
      
  /* #swagger.parameters["body"] = {
    in: "body",
    description: "Updated contact fields",
    required: true,
    schema: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@domain.com",
      favoriteColor: "blue",
      birthday: "Feb 2"
    }
} */
  try {

    const updatedContact =
      await contactsService.updateContact(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedContact);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Delete Contact"
  //#swagger.description="Delete selected contact from the database."
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
  } */
  try {

    await contactsService.deleteContact(req.params.id);

    res.status(200).json({
      message: "Contact deleted successfully!"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};