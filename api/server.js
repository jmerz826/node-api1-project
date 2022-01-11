const express = require('express');
const { del } = require('express/lib/application');
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
        if (!name || !bio) {
            res.status(400).json({message: 'Please provide name and bio for the user'})
        } else {
            const newUser = await User.insert({ id, name, bio });
            res.status(201).json(newUser)
        }
        
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
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// DELETE
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.remove(req.params.id);
        if (!deletedUser) {
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        } else {
            res.json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// PUT
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    try {
        const updatedUser = await User.update(id, { name, bio });
        if (!name || !bio) {
                res.status(400).json({message: "Please provide name and bio for the user"})
            } else if (!updatedUser){
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            }else {
                res.json(updatedUser)
            } 
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = server;
