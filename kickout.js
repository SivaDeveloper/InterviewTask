const express = require('express');
const router = express.Router();
const { getUser, deleteUserTokens } = require('./db');

router.post('/', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await getUser(username);

    if (user) {
      await deleteUserTokens(username);
      res.json({ message: 'User tokens invalidated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
