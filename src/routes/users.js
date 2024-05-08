var express = require('express');
var router = express.Router();
const {userSchema} = require('../config')
const {jwtGenerator, verifyToken} = require('../utils/jwt')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST register user. */
router.post('/register', function(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(400).json({message: 'All fields are required'});
  }

  const user = new userSchema({
    username: username,
    email: email,
    password: password
  });

  user.save().then(() => {
    const token = jwtGenerator(email);
    res.json({message: 'User created',
              token: token,
              user: {
                username: username,
                email: email
              }
    });
  }
  ).catch((err) => {
    res.status(400).json({message: err});
  }
  );

});

/* POST login user. */
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({message: 'All fields are required'});
  }

  userSchema.findOne({email: email}).then((user) => {
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }
    if (user.password !== password) {
      return res.status(400).json({message: 'Invalid password'});
    }
    const token = jwtGenerator(email);
    res.json({message: 'User logged in',
              token: token,
              user: {
                username: user.username,
                email: user.email
              }
    });
  }).catch((err) => {
    res.status(400).json({message: err});
  });

});

/* POST Verify token. */
router.post('/verify', verifyToken, function(req, res, next) {
  res.json({message: 'Token is valid'});
});





module.exports = router;
