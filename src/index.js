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

// Reinitialize database if set to true

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Task.deleteMany({})
    ]);
  }

  createUsersWithTasks();

  app.listen(process.env.PORT, () =>
    console.log(`App listening on Port ${process.env.PORT}`));
  }
);

// Seeds

const createUsersWithTasks = async () => {
  const user1 = new models.User({
    username: 'admin'
  });

  const task1 = new models.Task({
    text: 'Read Flower for Algernon',
    user: user1.id
  });

  const user2 = new models.User({
    username: 'user'
  });

  const task2 = new models.Task({
    text: 'Read Flower for Algernon',
    user: user2.id
  });

  await task1.save();
  await user1.save();
  await task2.save();
  await user2.save();
}
