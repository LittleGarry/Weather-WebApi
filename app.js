const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const verifyToken = require('./verifyToken')

require('dotenv/config');

app.use(bodyParser.json());

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

app.get('/', verifyToken, (req, res) =>  {
  res.json({
    test: {
      test1: 1,
      test2: 2
    }
  })
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected');
});

app.listen(3000);
