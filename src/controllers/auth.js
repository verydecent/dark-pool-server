import models from '../models';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import expressJwt from 'express-jwt';
import _ from 'lodash';
sgMail.setApiKey(process.env.SENDGRID_SANDBOX_API_KEY);

// Password reset

export const forgotPassword = (req, res) => {
  const { email } = req.body;

  models.User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist'
      });
    }

    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Dark Pool Notes - Account Password Reset Link`,
      html: `
        <h1>Please use the following link to change your password to your account for Dark Pool Notes</h1>
        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
        <hr />
        <p>This email may contain sensitive data</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    }

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log('Reset Password Link Error', err);
        return res.status(400).json({
          error: 'Database connection error on user password forgot request'
        });
      }
      else {
        sgMail.send(emailData)
          .then(sent => {
            console.log('Forgot Password Email Sent', sent);
            return res.status(200).json({
              message: `Email has been sent to ${email}. Follow the instructions to activate your account`
            });
          })
          .catch(error => {
            console.log('Forgot Password Email Error', error);
            res.json({
              message: error.message
            });
          });
      }
    });
  });
}

export const resetPassword = (req, res) => {
  console.log('Reset Password Route')
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
      if (err) {
        return res.json({
          error: 'Expired link try again'
        });
      }

      models.User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Something went wrong, try again'
          });
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
        }

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: 'Error resetting your password'
            });
          }

          res.json({
            message: 'Password updated with new password'
          });
        });
      });
    });

  }
}

// Admin middleware 
// Resources only admin can see

export const adminMiddleware = (req, res, next) => {
  models.User.findById({ _id: req.user.id }).exec((err, user) => {
    if (err ||!user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Access denied. Admin resource.'
      });
    }

    req.profile = user;
    next();
  });
}

// Middleware that requires JWT and checks if it was from our server

export const requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

export const login = (req, res) => {
  const { email, password } = req.body;

  models.User.findOne({ email }).exec((err, user) => {
    // Check if user exist
    if (err ||!user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please register'
      });
    }

    // Authenticate user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password does not match'
      });
    }
    
    // Generate token and send to client if authenticated
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    const { _id, username, email, role } = user;

    return res.json({
      token,
      user: { _id, username, email, role }
    });
  });
}

export const register = (req, res) => {
  const { username, email, password } = req.body;

  models.User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(422).json({
        error: 'User with provided email already exists'
      });
    }

    const token = jwt.sign({ username, email, password }, process.env.JWT_ACCOUNT_ACTIVATION_SECRET, { expiresIn: '10m' });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Dark Pool Notes - Account Activation Link`,
      html: `
        <h1>Please use the following link to activate your account for Dark Pool Notes</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensitive data</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    }

    sgMail.send(emailData)
      .then(sent => {
        console.log('Sign Up Email Sent', sent);
        return res.status(200).json({
          message: `Email has been sent to ${email}. Follow the instructions to activate your account`
        });
      })
      .catch(error => {
        console.log('Sign Up Email Error', error);
        res.json({
          message: error.message
        });
      });
  });
}

export const accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION_SECRET, function(err, decoded) {
      if (err) {
        console.log('JWT account verification error', err);
        return res.json({
          error: 'Expired link. Please sign up again'
        });
      }

      const { username, email, password } = jwt.decode(token);

      // This is where we make a new user - after activation
      const newUser = new models.User({ username, email, password });

      newUser.save((err, user) => {
        if (err) {
          console.log('Save User Account Error', err);
          return res.json({
            error: 'Error saving user to database. Try again'
          });
        }
        return res.json({
          message: 'Signup success. Please Sign in'
        });
      });
    });
  }
  else {
    return res.json({
      message: 'Server error, please try signing up again'
    });
  }
}