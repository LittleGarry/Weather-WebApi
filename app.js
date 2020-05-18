const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

const usersRoute = require('./users/users');
app.use('/users', usersRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('FOO connected');
});
//mongodb+srv://admin:<password>@cluster0-2kccr.mongodb.net/test?retryWrites=true&w=majority

app.listen(3000);
