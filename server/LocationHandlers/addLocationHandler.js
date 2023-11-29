const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addLocation = async (req, res) => {
  try {
    const { name, city, country, address, postalCode } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db('AccessTracker');
    const locationsCollection = db.collection('locations');

    const existingLocation = await locationsCollection.findOne({ name, address });

    if (existingLocation) {
      res.status(400).json({ error: 'Location already exists' });
      client.close();
      return;
    }

    const newLocation = { name, city, country, address, postalCode };
    await locationsCollection.insertOne(newLocation);

    res.status(201).json({ message: 'Location added successfully', location: newLocation });
    
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = addLocation;
