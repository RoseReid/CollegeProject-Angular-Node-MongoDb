var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cars = require('./routes/cars');
var customers = require('./routes/customers');
var employees = require('./routes/employees');
var compress = require('compression');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var users = require('./models/users.js');



passport.use(new Strategy(
  function(username, password, cb) {
    users.findByUsername(username, function(err, user) {
      console.log('auth chek')
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, { message: 'Incorrect username.' }); }
      if (user.password != password) { return cb(null, false,  { message: 'Incorrect password.' }); }
      return cb(null, user);
    });
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


var app = express();

app.use(require('morgan')('combined'));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true,
  debug: true
}));



app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(compress());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', express.static(path.join(__dirname, 'public/login')));


  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.use('/', require('connect-ensure-login').ensureLoggedIn())
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', cars);
app.use('/', customers);
app.use('/', employees);

// Define routes.


  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


module.exports = app;
