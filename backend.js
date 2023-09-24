const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const dbConnection = mysql.createConnection({
  host: 'your_mysql_host',
  user: 'root',
  password: 'root',
  database: 'mydb',
});

// Connect to MySQL
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  // Basic validation
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if the username or email is already taken
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  dbConnection.query(checkUserQuery, [username, email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists.' });
    }

    // Store the user in the "users" table
    const insertUserQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    dbConnection.query(insertUserQuery, [username,passaword,email], (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }

      const newUser = {
        id: result.insertId,
        username,
        email,
      };

      res.status(201).json({ message: 'User registered successfully.', user: newUser });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Find the user in the "users" table
  const findUserQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  dbConnection.query(findUserQuery, [username, password], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const user = {
      id: results[0].id,
      username: results[0].username,
      email: results[0].email,
    };

    res.json({ message: 'Login successful.', user });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
