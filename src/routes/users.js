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

  userSchema.findOneAndUpdate({email: email}, {lastLogin:Date.now()}).then((user) => {
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
  res.json({message: 'Token is valid'}).status(200);
});

/* POST Discord register or login. */
router.post('/discord', async function(req, res, next) {
  try {
    const discordUser = req.body.discordUser;
    const email = discordUser.email;
    let user = await userSchema.findOne({ email });

    if (!user) {
      const token = jwtGenerator(email);
      const newUser = new userSchema({
        discordId: discordUser.id,
        email,
        username: discordUser.username,
        avatar: discordUser.avatar,
        password: token
      });
      await newUser.save();
      res.json({
        message: 'User created',
        token,
        user: {
          username: discordUser.username,
          email
        }
      });
    } else {
      user = await userSchema.findOne({ discordId: discordUser.id });
      if (!user) {
        await userSchema.findOneAndUpdate({ email }, { discordId: discordUser.id });
        res.json({
          message: 'User linked',
          token,
          user: {
            username: discordUser.username,
            email
          }
        });
      } else {
        const token = jwtGenerator(email);
        await userSchema.findOneAndUpdate({ email }, { lastLogin: Date.now() });
        res.json({
          message: 'User logged in',
          token,
          user: {
            username: user.username,
            email: user.email
          }
        });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});






module.exports = router;
