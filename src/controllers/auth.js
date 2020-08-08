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
  // Create user id
  // username
  // email
  // passwords

  console.log('====auth====', req.body);

  // const newUser = new models.User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  // newUser.save(function(err, doc) {
  //   if (err) return res.status(500).json(err);
  //   res.status(200).json(doc);
  // });
};