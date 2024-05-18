var express = require('express');
var session = require('express-session');
var usersRouter = require('./routes/users');
var charactersRouter = require('./routes/characters');
require("dotenv").config();
var passport = require("passport");
require("./db")
const expressListEndpoints = require('express-list-endpoints');

var app = express();
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', usersRouter);
app.use('/api', charactersRouter);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}
);
app.get('/', function(req, res) {
    const routes = expressListEndpoints(app);
    const filteredRoutes = routes.filter(route => route.path !== '/api' && route.path !== '/');
    const pathRoutes = filteredRoutes.map(route => route.path
    );

    const html = `<html>
    <head>
    <title>GachaAPI</title>
    </head>
    <body>
    <h1>GachaApi</h1>
    <ul>
    ${pathRoutes.map(route => `<li><a href="${route}">${route}</a></li>`).join('')}
    </ul>
    </body>
    </html>`;
    res.send(html);
    
}
);

app.listen(3001, function() {
    console.log('Listening on port 3001');
});

module.exports = app;
