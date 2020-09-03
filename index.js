const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [];

server.use(express.json())

//--POST-api/users--//
server.post('/api/users',(req,res) => {
    const newUser = req.body;
    newUser.id = shortid.generate();

    users.push(newUser);

    res.status(201).json(users);
    
})

//--GET-api/users--//
server.get('/api/users',(req,res) => {
    res.status(200).json(users)
})

//--DELETE-api/users/id--//
server.delete('/api/users/:id',(req,res) => {
    const {id} = req.params;

    const deleted = users.find( user => user.id === id)

    if(deleted) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(deleted)
    }
    else{
        res.status(404).json({message:"user not found"})
    }

})

//--GET w/ id-api/users/id--//
server.get('/api/users/:id',(req,res) => {
    const {id} = req.params;

    let searched = users.find( user => user.id === id)

    if(searched) {
        res.status(200).json(searched)
    }
    else{
        res.status(404).json({message:"this user not found"})
    }

})

//--PUT_-api/users/id-//
server.put('/api/users/:id',(req,res) => {
    const {id} = req.params;
    const changes = req.body;
    changes.id = id;

    let index = users.findIndex( user => user.id === id)

    if(index !== -1) {
        users[index] = changes;
        res.status(200).json(users[index])
    }
    else{
        res.status(404).json({message:"user not found"})
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