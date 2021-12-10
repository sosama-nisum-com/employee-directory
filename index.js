const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const employee = require('./routes/employee');
const config = require('./config.json');

const url = process.env.DATABASEURL || config.databaseURL
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employee",employee);

app.use((err, req, res, next) => {
    if(err.message === 'Only images are allowed') return res.status(400).send("Only images are allowed");

    console.log(err.stack);
    res.status(500).send("something went wrong");
});

const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", function() {
    console.log(`Listening on Port ${port}`);
});