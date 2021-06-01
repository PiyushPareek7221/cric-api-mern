require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const dataRoutes = require('./routes/data')

mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED');
}); 

app.use(cors());
app.use(express.json())
app.use('/api', dataRoutes);

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`app is runnig at ${port}`)
});