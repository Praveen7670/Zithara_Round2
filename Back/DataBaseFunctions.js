const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '3.26.216.117',//insert here new public api
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

async function createUsersTable() {
    const exists = await tableExists('users');
    if (!exists) {
      try {
        await pool.query(`
          CREATE TABLE users (
            sno SERIAL PRIMARY KEY,
            customer_name VARCHAR(100),
            age INT,
            phone VARCHAR(20),
            location VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('Users table created successfully');
      } catch (error) {
        console.error('Error creating users table:', error);
      }
    }
}

async function tableExists(tableName) {
    const result = await pool.query(`SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)`, [tableName]);
    return result.rows[0].exists;
}

async function createUser(customer_name, age, phone, location) {
    try {
        const query = 'INSERT INTO users(customer_name, age, phone, location) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [customer_name, age, phone, location];
        const result = await pool.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
}

module.exports = { createUsersTable, createUser, pool };
