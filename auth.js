const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { getUser, setUser, generateToken, getToken, setToken } = require('./db');
const config = require('./config');

const generateOneTimeLink = (userId) => {
  const token = crypto.randomBytes(16).toString('hex');
  const link = `http://localhost:3000/auth/one-time-link/${token}`;
  setToken(token, { userId, type: 'one-time', expiresAt: Date.now() + config.oneTimeLinkExpiry });
  return link;
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(username);

    if (user && user.password === password) {
      const token = generateToken(username);
      await setToken(token, { username });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/one-time-link', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await getUser(username);

    if (user) {
      const link = generateOneTimeLink(user.id);
      res.json({ link });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/one-time-link/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const tokenData = await getToken(token);

    if (tokenData && tokenData.type === 'one-time' && Date.now() < tokenData.expiresAt) {
      const newToken = generateToken(tokenData.userId);
      await setToken(newToken, { username: tokenData.userId });
      res.json({ token: newToken });
    } else {
      res.status(401).json({ message: 'Invalid or expired link' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
