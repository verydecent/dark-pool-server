require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
const mongoose = require('mongoose');

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

const app = express();
const PORT = process.env.PORT || 3000;

// Application level middleware

// app.use(cors()); // Allows all origins
if (process.env.ENVIRONMENT === 'development') {
  app.use(cors({ origin: ['http://localhost:1024'] }));
}

if (process.env.ENVIRONMENT === 'production') {
  app.use(cors({ origin: ['http://darkpool.netlify.com'] }));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/task', routes.task);
app.use('/user', routes.user);

app.get('/', (req, res) => {
  res.send('API 200');
});

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`App listening on Port ${PORT}`));
});