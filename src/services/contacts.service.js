//Import dependencies
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

//Get the collection to perform CRUD operations on
const collection = getCollection();

/** Prepare all endpoints services */

//Get all contacts
const getAllContacts = async () => {
  return await collection.find({}).toArray();
};

//Get single contact by id
const getContactById = async (id) => {
  return await collection.findOne({ _id: new ObjectId(id) });
};

//Create new contact
const createContact = async (contactData) => {
  const result = await collection.insertOne(contactData);
  return result.insertedId;
};

//Update contact by id
const updateContact = async (id, updatedData) => {
  delete updatedData._id; //prevent _id overwrite
  
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  return result.modifiedCount > 0;
};

//Delete contact by id
const deleteContact = async (id) => {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};