const express = require('express');

const mongoose = require('mongoose');

const UserModel = require('./Model/userModel')

const PORT = process.env.PORT || 2000;

const app = express();

//middleware
app.use(express.json());

//mongodb connection string
// const mongoURL = "mongodb://localhost: 27017/crudDB"
const mongoURL = "mongodb://127.0.0.1:27017/crudDB";

//connect mongoose to the express server
mongoose.connect(mongoURL).then((result) => {
    if(result) console.log('mongoDB connected')
}).catch((err) => {
    console.log(err);
});


// async function connectDb() {
//     try {
//         const result = await mongoose.connect(mongoURL)

//         if(result) console.log('mongoDB connected')
//     } catch (error) {
// console.log(error);
// }
// }


//POST A REQUEST
app.post('/api/user-data', async (req, res) => {
    const { name, email, age, isHungry } = req.body

    const user = {
        name, 
        email,
        age,
        isHungry
    }

    //preparing data to be saved
    const dataStore = new UserModel(user);

    try {
    //saving to the database(DB);
    const results = await dataStore.save()

    if(results) res.send(results)
    
} catch (error) {
    console.log(error);
}
})


//GET A REQUEST
app.get('/api/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users)
    
    } catch (error) {
        res.status(500).send(error);
    }
})


//GET A REQUEST BY ID
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if(user) res.send(user);
    } catch (error) {
        res.status(404).send(error)
    }
})


//DELETE A REQUEST
app.delete('/api/users/:id', async (req, res) => {
    try {
const users = await UserModel.find();
res.send(users)
} catch (error) {
    res.status(404).send(error)
}

});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})