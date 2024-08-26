//index.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./User')
  
const app = express()
const port = 3000
 
app.use(cors())
app.use(express.json())
  
main().catch(err => console.log(err));
 
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/nodeexpressdb', {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}
 
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})
 
app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
  
  
app.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})
  
app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
  
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})
  
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})