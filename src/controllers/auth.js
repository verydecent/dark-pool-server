import models from '../models';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_SANDBOX_API_KEY);

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

    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role }
    });
  });
}