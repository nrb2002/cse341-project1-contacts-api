const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

// Get all contacts
const getAllContacts = async () => {
  return await getCollection("contacts")
    .find({})
    .toArray();
};

// Get single contact
const getContactById = async (id) => {
  return await getCollection("contacts")
    .findOne({ _id: new ObjectId(id) });

  console.log("ID received: ", id); //For testing
};

// Create contact
const createContact = async (contactData) => {
  const result = await getCollection("contacts")
    .insertOne(contactData);

  return result.insertedId;
};

// Update contact
const updateContact = async (id, updatedData) => {
  delete updatedData._id;

  const result = await getCollection("contacts")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

  return result.modifiedCount > 0;
};

// Delete contact
const deleteContact = async (id) => {
  const result = await getCollection("contacts")
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};