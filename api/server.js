const express = require('express');
const User = require('./users/model');

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// ENDPOINTS
server.get('/', (req, res) => {
    res.status(200).json('it workin')
})

// POST
server.post('/api/users', async (req, res) => {
    try {
        const { id, name, bio } = req.body;
        const newUser = await User.insert({ id, name, bio });
        res.status(201).json(newUser)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// GET 
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET with specified ID
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({message: 'no user'})
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = server;
