const mongoose = require('mongoose')
mongoose.set('strictQuery', false)//not get any warnings
mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected', ()=>{
    console.log('Mongo DB Connection Successfull');
})

connection.on ('error' , (err)=>{
    console.log('Mongo DB Connection Failed');
})