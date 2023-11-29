const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const findPostsByLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const { locationId } = req.params;
    const db = client.db('AccessTracker');
    const postsCollection = db.collection('posts');
    const locationsCollection = db.collection('locations'); 

    const locationPosts = await postsCollection.find({ locationId: new ObjectId(locationId) }).toArray();
    const location = await locationsCollection.findOne({ _id: new ObjectId(locationId) });

    res.status(200).json({ posts: locationPosts, name: location.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
};

module.exports = findPostsByLocation;
