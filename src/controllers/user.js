import models from '../models';

export const readUser = (req, res) => {
  const userId = req.params.id;

  models.User.findById(userId).exec((err, user) => {
    console.log('user');
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