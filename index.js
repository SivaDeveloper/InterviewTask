const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { verifyToken } = require('./auth');
const authRoutes = require('./auth');
const timeRoutes = require('./time');
const kickoutRoutes = require('./kickout');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/time', verifyToken, timeRoutes);
app.use('/kickout', kickoutRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
