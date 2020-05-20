const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const cityRoute = require('./routes/cities');
app.use('/api/cities', cityRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected');
});

app.listen(3000);
