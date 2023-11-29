const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const userSignup = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
    try {
      const { username, email, password } = req.body;
  
      const db = client.db('AccessTracker');
      const usersCollection = db.collection('users');
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();
  
      await usersCollection.insertOne({ username, email, password: hashedPassword, userId });
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = userSignup;
