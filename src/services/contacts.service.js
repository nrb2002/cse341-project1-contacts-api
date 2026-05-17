const Contact = require("../models/contacts.model");

// Get all contacts
const getAllContacts = async () => {
  return await Contact.find();
};

// Get single contact
const getContactById = async (id) => {
  return await Contact.findById(id);
};

// Create contact
const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

// Update contact
const updateContact = async (id, updatedData) => {
  return await Contact.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete contact
const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
