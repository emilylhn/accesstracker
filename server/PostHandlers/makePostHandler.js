const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const makePost = async (req, res) => {
  console.log('Handler: makePost');

  const client = new MongoClient(MONGO_URI, options);


  try {
    await client.connect();

    console.log(req.body); 
    console.log(req.params); 

    const { locationId, title, content, tags, experience } = req.body;
    const userId = req?.userId;
    const db = client.db('AccessTracker');
    const usersCollection = db.collection('users');
    const locationsCollection = db.collection('locations');

    const user = await usersCollection.findOne({ userId: userId });
    const location = await locationsCollection.findOne({ _id: new ObjectId(locationId) });

    if (!user || !location) {
      return res.status(404).json({ message: 'User or Location not found' });
    }

    const postsCollection = db.collection('posts');
    const newPost = {
      userId: userId,
      locationId: new ObjectId(locationId),
      title,
      content,
      tags,
      experience,
    };

    await postsCollection.insertOne(newPost);

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
};

module.exports = makePost;
