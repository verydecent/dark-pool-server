/* const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.
  connect(process.env.MONGO_URI, { userNewUrlParser: true })
  .then(() => console.log('Database Connected'));

mongoose.connection.on('error', err => {
  console.log(`Database connection error ${err.message}`);
}); */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import models, { connectDb } from './models';

const app = express();

// Application level middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/anotherRoute', routes.anotherRoute);

app.get('/', (req, res) => {
  res.send('API success');
});

connectDb()
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening on Port ${process.env.PORT}`)
    );
  });
