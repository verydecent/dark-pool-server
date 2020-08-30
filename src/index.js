import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';
import models, { connectDb } from './models';

const app = express();

// Application level middleware

// app.use(cors()); // Allows all origins
if (process.env.ENVIRONMENT === 'development') {
  app.use(cors({ origin: ['http://localhost:1024', 'https://hoppscotch.io'] }));
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

// Reinitialize database if set to true

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      // models.User.deleteMany({}),
      // models.Task.deleteMany({}),
      // models.Subtask.deleteMany({})
    ]);
  }

  // createUsersWithTasks();

  app.listen(process.env.PORT, () =>
    console.log(`App listening on Port ${process.env.PORT}`));
}
);

// Seeds

const createUsersWithTasks = async () => {
  const user1 = new models.User({
    username: 'admin',
    email: 'dp_admin@mail.com'
  });

  const task1 = new models.Task({
    title: 'Organize Room',
    description: 'Room became messy for the past few weeks, clean up by tonight!',
    subtasks: [
      /*
      {
        description: 'Mop floor',
        complete: false
      },
      {
        description: 'Wipe desk with disinfectant',
        complete: false
      },
      {
        description: 'Laundry',
        complete: false
      },
      {
        description: 'Wipe windows',
        complete: true
      }
      */
    ]
    // user: user1.id
  });

  // const user2 = new models.User({
  //   username: 'user'
  // });

  // const task2 = new models.Task({
  //   text: 'Read Flower for Algernon',
  //   user: user2.id
  // });

  // await task1.save();
  // await user1.save();
  // await task2.save();
  // await user2.save();
}
