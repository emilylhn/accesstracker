const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deletePost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const { postId } = req.params;
    const db = client.db('AccessTracker');
    const postsCollection = db.collection('posts');

    const deletionResult = await postsCollection.deleteOne({ _id: new ObjectId(postId) });

    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
};

module.exports = deletePost;
