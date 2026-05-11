const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI); //MongoDB Atlas connection string saved in .env file, format: mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

const dbName = process.env.DB_NAME; //Database name saved in .env file, default to "contactsDB" if not provided

let collection;

const connectDB = async () => {
  await client.connect();
  
  collection = client.db(dbName);
  console.log("Connected to MongoDB Atlas"); //For testing
}

//Get the collection to perform CRUD operations on
function getCollection() {
  return collection;
}

module.exports = {
  connectDB,
  getCollection
};
