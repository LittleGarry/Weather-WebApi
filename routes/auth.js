const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');

router.post('/register', [
  check('email', 'Your email is not valid').isEmail(),
  check('password', 'Invalid password').isLength({ min: 6 }),
  check('name', 'Invalid name').isLength({ min: 1})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch(err) {
      res.status(400).send(err);
  }
});


router.post('/login', [
    check('email', 'Your email is not valid').isEmail(),
    check('password', 'Invalid password').isLength({ min: 6 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const userExist = await User.findOne({email: req.body.email});
    if (!userExist) return res.status(400).send('User does not exist');
  
    const validPassword = await bcrypt.compare(req.body.password, userExist.password);
    if (!validPassword) return res.status(400).send('Incorrect password'); 
    
    const userId = userExist._id;
    const user = { _id: userId };
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({name: userExist.name, accessToken: accessToken});
});

module.exports = router;
