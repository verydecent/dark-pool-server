const router = require('express').Router();
const { readUser, updateUser } = require('../controllers/user');
const { requireLogin, adminMiddleware } = require('../controllers/auth');

// Retrieve user info based on user id
router.get('/:id', requireLogin, readUser);

// Update Subscriber user info
router.put('/', requireLogin, updateUser);

// Update Admin user info
router.put('/admin', requireLogin, adminMiddleware, updateUser);

module.exports = router;
