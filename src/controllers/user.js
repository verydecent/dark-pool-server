import models from '../models';

export const readUser = (req, res) => {
  const userId = req.params.id;

  models.User.findById(userId).exec((err, user) => {
    console.log('user', req.user);
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    // Remove sensitive info
    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
  });
};

export const updateUser = (req, res) => {
  console.log('Update User', req.user, 'Update Data', req.body);

  const { username, password } = req.body;

  // req.user._id is being made available from express-jwt

  models.User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (!username) {
      return res.status(400).json({
        error: 'Username is required'
      });
    }
    else {
      // If there is a name, then update the user's username with the new username
      user.username = username;
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Passwords length needs to be at least 6 characters long'
      });
    }
    else {
      // If there is a password, then update the user's password with the new password
      user.password = password;
    }

    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: 'User update faied'
        });
      }

      // Remove sensitive info
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(user);
    });
  });
}