const { MongoClient } = require("mongodb");
const locations = require('./data/locations.json')
const posts = require('./data/posts.json')
const users = require('./data/users.json')
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

const batchImport = async() => {
    try {
        await client.connect();
        const db = client.db('AccessTracker');
        const resultLocations = await db.collection("locations").insertMany(locations);
        const resultPosts = await db.collection("posts").insertMany(posts)
        const resultUsers = await db.collection("users").insertMany(users)
        console.log(resultLocations)
        console.log(resultPosts)
        console.log(resultUsers)
    } catch (error) {
        console.log(error)
    } finally {
        client.close();
    }
};

batchImport();