const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const searchLocation = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db('AccessTracker');
    const locationsCollection = db.collection('locations');

    const query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, 
        { address: { $regex: searchTerm, $options: 'i' } }, 
      ],
    };

    const matchedLocations = await locationsCollection.find(query).toArray();

    res.status(200).json({ locations: matchedLocations });
    
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = searchLocation;

