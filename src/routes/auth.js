import { Router } from 'express';
import models from '../models';
import { register } from '../controllers/auth';

const router = Router();

router.post('/register', (req, res) => {


  // Create user id
  // username
  // email
  // passwords

  console.log('====auth====', req.body);

  const newUser = new models.User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  console.log('newUser', newUser);

  newUser.save(function(err, doc) {
    if (err) return res.status(500).json(err);
    res.status(200).json(doc);
  })
});
  
  

router.get('/test', (req, res) => {
  res.json({ message: 'something bad inide is happening' });
});

export default router;
