const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.send('TEST');
});

router.post('/', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save()
    .then((data) => {
      res.json(data);
      console.log('data', data);
    })
    .catch((err) => {
      res.json({ message: err });
      console.log('err', err);
    });
});

module.exports = router;
