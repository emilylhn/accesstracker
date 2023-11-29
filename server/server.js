const express = require('express');
const morgan = require('morgan');
const userSignup = require('./LoginHandlers/signUpHandler');
const userLogin = require('./LoginHandlers/loginHandler');
const searchLocation = require('./LocationHandlers/searchLocationHandler')
const addLocation = require('./LocationHandlers/addLocationHandler')
const makePost = require('./PostHandlers/makePostHandler')
const editPost = require('./PostHandlers/editPost')
const deletePost = require('./PostHandlers/deletePost')
const findPostsByUser = require('./PostHandlers/findPostsByUser')
const findPostsByLocation = require('./PostHandlers/findPostsByLocation')
const verifyToken = require('./middleware/verifyToken')
const findPostById = require('./PostHandlers/findPostByID')

express()

.use(morgan('tiny'))

.use(express.static('public'))
.use(express.json())

.get('/', (req, res) => {
    res
        .status(200)
        .json({ status: 200, message: "This is the homepage... it's empty :(" });
    })

    .post('/signup', userSignup)
    .post('/login', userLogin)

    .get('/locations/search', searchLocation)
    .post('/locations', verifyToken, addLocation)

    .post('/locations/:locationId/posts', verifyToken, makePost)
    .get('/users/:userId/posts', verifyToken, findPostsByUser)
    .get('/locations/:locationId/posts', findPostsByLocation)
    .patch('/posts/:postId', verifyToken, editPost)
    .delete('/posts/:postId', verifyToken, deletePost)
    .get('/posts/:postId', verifyToken, findPostById)


.get('*', (req, res) => {
    res
        .status(404)
        .json({
            status: 404,
            message: 'This is obviously not the page you are looking for.',
        });
})

.listen(8000, () => console.log(`Listening on port 8000`));