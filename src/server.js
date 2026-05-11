//Import dependencies
require('dotenv').config();
const app = require('./app');

//Import database connection function
const { connectDB } = require('./config/db');
//Set up server port
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected, starting server...'); //For testing 

    app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
    } );
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

startServer();




//Make api work accross sites -- this is handled by cors
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Acces-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();  
// });





