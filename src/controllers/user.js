import models from '../models';

export const readUser = (req, res) => {
  const userId = req.params.id;

  models.User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
  });
};