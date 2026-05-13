const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI); //MongoDB Atlas connection string saved in .env file, format: mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

const dbName = process.env.DB_NAME || "contactsDB"; //Database name saved in .env file, default to "contactsDB" if not provided

let database;

const connectDB = async () => {
  await client.connect();  
  database = client.db(dbName);
  console.log("Connected to MongoDB Atlas"); //For testing
}

const getDB = () => {
  if (!database) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return database;
};

//Get the collection to perform CRUD operations on
function getCollection(name) {
  if (!database) {
    throw new Error("Database not connected. Call connectDB first.");
  }

  return database.collection(name);
}

module.exports = {
  connectDB,
  getCollection,
  getDB
};
