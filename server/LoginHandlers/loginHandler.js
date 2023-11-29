const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { MONGO_URI, JWT_SECRET } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const userLogin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const { email, password } = req.body;

    const db = client.db('AccessTracker');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    console.log('Retrieved User:', user);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    console.log('User Object:', user);
    
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

    const { password: _, ...userData } = user;
    res.status(200).json({ message: 'Login successful', user: { ...userData, userId: user.userId }, token  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
};

module.exports = userLogin;
