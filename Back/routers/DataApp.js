// Example route for fetching villages using PostgreSQL
const exp = require('express');
const DataApp = exp.Router();
const { createUsersTable, createUser, pool } = require('../DataBaseFunctions');

DataApp.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching users', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

DataApp.post('/users', async (req, res) => {
    const {name, age, phone, location} = req.body;
    try {
        await createUsersTable(); // Check and create table if it doesn't exist
        const newUser = await createUser(name, age, phone, location);
        res.json(newUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = DataApp;
