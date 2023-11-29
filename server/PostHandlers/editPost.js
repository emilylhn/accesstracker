const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const editPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
  
    try {
      await client.connect();
  
      const { postId } = req.params;
      const { content, tags } = req.body;
      
      const db = client.db('AccessTracker');
      const postsCollection = db.collection('posts');
  
      const updateResult = await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { content, tags } }
      );
  
      if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: 'Post not found or no changes made' });
      }
  
      const updatedPost = await postsCollection.findOne({ _id: new ObjectId(postId) });
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      client.close();
    }
  };
  
  module.exports = editPost;