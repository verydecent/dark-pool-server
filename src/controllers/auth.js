import models from '../models';


export const register = (req, res) => {
  const { username, email, password } = req.body;

  models.User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'User with provided Email already exists'
      });
    }
  });

  const newUser = new models.User({ username, email, password });

  newUser.save((err, success) => {
    if (err) {
      console.log('User Registration Error', err);
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      message: 'User Registration Success'
    });
  });
}