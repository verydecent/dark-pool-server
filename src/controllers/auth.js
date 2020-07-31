export const register = (req, res) => {
  try {
    const { email, password, passwordConfirm, username } = req.body;

    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Missing one or more required fields' });
    }

    if (passowrd.length < 5) {
      return res.status(400).json({ message: 'The password needs to be at least 5 characters long' });
    }
    
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'The password and password confirm do not match' });
    }
  }
  catch (err) {
   res.status(500).json(err); 
  }
  return res.json({ data: 'Register endpoint from controllers folder' });
};
