import models from '../models';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_SANDBOX_API_KEY);

// export const register = (req, res) => {
//   const { username, email, password } = req.body;

//   models.User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: 'User with provided Email already exists'
//       });
//     }
//   });

//   const newUser = new models.User({ username, email, password });

//   newUser.save((err, success) => {
//     if (err) {
//       console.log('User Registration Error', err);
//       return res.status(400).json({
//         error: err
//       });
//     }

//     res.json({
//       message: 'User Registration Success'
//     });
//   });
// }

export const register = (req, res) => {
  const { username, email, password } = req.body;

  models.User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(422).json({
        error: 'User with provided email already exists'
      });
    }

    const token = jwt.sign({ username, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Dark Pool Notes - Account Activation Link`,
      html: `
        <h1>Please use the following link to activate your account for Dark Pool Notes</h1>
        <p>${process.env.CLIENT_URL}/auth/activate</p>
        <hr />
        <p>This email may contain sensitive data</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    }

    sgMail.send(emailData)
      .then(send => {
        console.log('Sign Up Email Sent', sent);
        return res.json({
          message: `Email has been sent to ${email}. Follow the instructions to activate your account`
        });
      })
      .catch(error => res.status(500).json(error));
  });
}