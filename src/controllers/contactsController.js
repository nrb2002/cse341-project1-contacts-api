// const { response } = require("express");
const { getCollection } = require("../db/mongo");
const { ObjectId } = require("mongodb");

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
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }

    const collection = getCollection();
    const contact = await collection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}

//Get all contacts
async function getAllContacts(req, res) {
  //#swagger.tags=["Contacts CRUD Operations"]
  //#swagger.summary="Get All Contacts"
  //#swagger.description="Pull all contacts from the database. "
  try {
    const collection = getCollection();
    const contacts = await collection.find({}).toArray();

    //#swagger.tags=[if (contacts.length === 0) { ]
    //#swagger.tags=[   return res.status(404).json({ message: "No contacts found" }); ]
    //#swagger.tags=[ } ]

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const collection = getCollection();
    const newContact = req.body;

    if (!newContact || Object.keys(newContact).length === 0) {
      return res.status(400).json({ message: "Contact data is required" });
    }

    const result = await collection.insertOne(newContact);

    res.status(201).json({
      message: "Contact created successfully",
      id: result.insertedId
    });
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
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }
    //Make the data to update
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "Update data is required" });
    }
    
    const collection = getCollection();

    console.log("ID received: ", id) //For testing purposes
    
    delete updatedData._id; //prevent _id overwrite

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully" });
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
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }

    const collection = getCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

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
