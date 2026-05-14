const service = require("../services/contacts.service");


//Get all contacts
async function getAllContacts(req, res) {
  //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Get All Contacts"
  //#swagger.description="Pull all contacts from the database. "
  try {
    const contacts = await service.getAllContacts();

    //#swagger.tags=[if (contacts.length === 0) { ]
    //#swagger.tags=[   return res.status(404).json({ message: "No contacts found" }); ]
    //#swagger.tags=[ } ]

    //Return the contacts
    res.status(200).json(contacts);

    //Note: The error handling for database connection issues is done in the service layer, so we catch it here and return a 500 status with a message.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
/**
 * GET single contact by id (query param)
 * Example: /contacts?id=65abc123...
 */
async function getContactById(req, res) {
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
    const contact = await service.getContactById(req.params.id);
    //Check if id is provided
    if (!req.params.id) {
      return res.status(400).json({ message: "Contact id is required" });
    }
    //Check if contact exists
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    //Return the contact
    res.status(200).json(contact);

    //Note: The error handling for invalid ObjectId format is done in the service layer, so we catch it here and return a 500 status with a message.
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}

//Create new contact
async function createContact(req, res){
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
    const newContact = await service.createContact(req.body);
    //Check if data is provided
    if (!newContact || Object.keys(newContact).length === 0) {
      return res.status(400).json({ message: "Contact data is required" });
    }
    //Return the id of the newly created contact
    res.status(201).json({
      message: "Contact created successfully",
      id: result.insertedId
    });
    //Note: The error handling for invalid data format is done in the service layer, so we catch it here and return a 500 status with a message.
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

//Update a contact
async function updateContact(req, res){
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
    const updatedData = await service.updateContact(req.params.id, req.body);

    //Check if id is provided
    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }
    //Check if update data is provided
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "Update data is required" });
    }

    console.log("ID received: ", id) //For testing purposes
    //Check if contact exists and was updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    //Return success message
    res.status(200).json({ message: "Contact updated successfully" });

    //Note: The error handling for invalid ObjectId format is done in the service layer, so we catch it here and return a 500 status with a message.
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}

//Delete a contact
async function deleteContact(req, res){
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
    const result = await service.deleteContact(req.params.id);
    //Check if id is provided
    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }
    //Check if contact exists and was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    //Return success message
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact   
}
