const mysql = require('mysql2/promise');
const crypto = require('crypto');
const config = require('./config');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  database: 'interviewtask',
  password: 'password@123',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const generateToken = () => crypto.randomBytes(16).toString('hex');

const getUser = async (username) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const setUser = async (username, password) => {
  await pool.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};

const setToken = async (token, data) => {
  await pool.execute('INSERT INTO tokens (token, data) VALUES (?, ?)', [token, JSON.stringify(data)]);
};

const getToken = async (token) => {
  const [rows] = await pool.execute('SELECT * FROM tokens WHERE token = ?', [token]);
  return rows[0];
};

const deleteUserTokens = async (username) => {
  await pool.execute('DELETE FROM tokens WHERE JSON_EXTRACT(data, "$.username") = ?', [username]);
};

module.exports = {
  getUser,
  setUser,
  setToken,
  getToken,
  deleteUserTokens,
  generateToken
};
