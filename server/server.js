'use strict';

const _ = require('underscore');
const users = require('./routes/data/persons').peoples.map(
  person => {
    return person;
  }
);
const express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  http = require('http'),
  path = require('path'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  api = require('./routes/api'),
  cors = require('cors');

const app = express();

passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = users.find(u => u.email === username && u.password === password);

    if(user && _.contains(['admin', 'viewer'], user.rule)){
      return done(null, {username:username, rule: user.rule});
    } else {
      return done("unauthorized access", false);
    }
  }
));

passport.serializeUser(function(user, done) {
  if(user) done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

const auth = () => {
  return (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
      req.login(user, function(error) {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  }
}

const isLoggedIn = (req, res, next) => {
  console.log('session ', req.session);
  if(req.isAuthenticated()){
    console.log('user ', req.session.passport.user)
    return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});

// JSON API
app.get('/api/movies', api.listAll);
app.get('/api/movies/:id', isLoggedIn, api.get);
app.get('/api/movies/title/:title', isLoggedIn, api.filterByTitle);
app.get('/api/movies/genre/:genre', isLoggedIn, api.filterByGender);
app.post('/api/movies', api.create);
app.put('/api/movies/:id', api.update);
app.delete('/api/movies/:id', isLoggedIn, api.delete);
app.post('/api/authenticate', auth() , api.authenticate);

app.listen(app.get('port'), function () {
  console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});
