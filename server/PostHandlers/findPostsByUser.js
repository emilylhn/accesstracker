const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const findPostsByUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const { userId } = req.params;
    const db = client.db('AccessTracker');
    const postsCollection = db.collection('posts');

    const userPosts = await postsCollection.find({ userId: userId }).toArray();

    res.status(200).json({ posts: userPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
};

module.exports = findPostsByUser;
