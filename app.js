const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.
  connect(process.env.MONGO_URI, { userNewUrlParser: true })
  .then(() => console.log('Database Connected'));

mongoose.connection.on('error', err => {
  console.log(`Database connection error ${err.message}`);
});
