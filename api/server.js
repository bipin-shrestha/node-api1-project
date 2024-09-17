// BUILD YOUR SERVER HERE
// importing the Data model to interact with the data
const Users = require('./users/model.js');
// bringing express into the project
const express = require('express');
const server = express();
server.use(express.json());

// [GET] request for the root path ('/')
server.get('/', (req, res) => {
    res.json({ message : " Hello World "});
});

// [POST] Creates a user using the information sent inside the request body.
server.post ('/api/users', async (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" });
    } else {
        try {
            const newUser = await Users.insert(user)
            res.status(201).json(newUser);
        } catch(err){
        res.status(500).json({ message: "There was an error while saving the user to the database" });
        }
    } 
});

// [Get] will Returns an array 
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (err){
        res.status(500).json({ message: "The users information could not be retrieved" });
    }
});

// [GET] Returns the user object with the specified `id`
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else { 
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

// [DELETE] Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.remove(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } 
    } catch (err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})
// [PUT] Updates the user with the specified `id` using data from the `request body`. Returns the modified user 
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(!changes.name || !changes.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        try {
            const updatedUser = await Users.update(id, changes);
            if(updatedUser){
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        } catch(err){
            res.status(500).json({ message: "The user information could not be modified" })
        }
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
