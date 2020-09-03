const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

server.use(express.json())

//--POST-api/users--//
server.post('/api/users',(req,res) => {
    const newUser = req.body;
    newUser.id = shortid.generate();

    try{
        if(newUser.name && newUser.bio ){
            users.push(newUser)
            res.status(201).json(users)    
        } else{
            res.status(400).json({message:"come on man.. add a name and bio.."});
        }

    }catch(err) {
        res.status(500).json({message:"There was an error while saving the user to the database"});
    }
    
})

//--GET-api/users--//
server.get('/api/users',(req,res) => {
    try{
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({message:"The users information could not be retrieved."});
    }
})

//--DELETE-api/users/id--//
server.delete('/api/users/:id',(req,res) => {
    const {id} = req.params;

    const deleted = users.find( user => user.id === id)

    try{
        if(deleted) {
            users = users.filter(user => user.id !== id)
            res.status(200).json(deleted)
        }
        else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err) {
        res.status(500).json({message:"The user could not be removed"});
    }
})

//--GET w/ id-api/users/id--//
server.get('/api/users/:id',(req,res) => {
    const {id} = req.params;
    try{
        let searched = users.find( user => user.id === id)

        if(searched) {
            res.status(200).json(searched)
        }
        else{
            res.status(404).json({message:"this user not found"})
        }
    }catch(err) {
        res.status(500).json({message:"The user information could not be retrieved."});
    }

})

//--PUT_-api/users/id-//
server.put('/api/users/:id',(req,res) => {
    const {id} = req.params;
    const changes = req.body;
    changes.id = id;

    try{
        let index = users.findIndex( user => user.id === id)

        if(index !== -1) {
            if(changes.name && changes.bio ){
                users[index] = changes;
                res.status(200).json(users[index])
            } else{
                res.status(400).json({message:"come on man.. add a name and bio.."});
            }
        }
        else{
            res.status(404).json({message:"user not found"})
        }
    }catch(err) {
        res.status(500).json({message:"error in updating the user"});
    }

})

//-----//
const PORT = 5000

server.listen(PORT,() => {
    console.log('Atta boy dust')
})

//--POST-api/users--//


//--GET-api/users--//

//--GET w/ id-api/users/id--//

//--DELETE-api/users/id--//

//--PUT_-api/users/id-//