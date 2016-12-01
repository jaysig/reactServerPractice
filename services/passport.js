const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy({localOptions} , function(email, password, done) {
  // Verify this username and password, call done with the username
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err, false); }
    if (!user) { return done(null, false); }

    // compare passwords
  })
});
//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }
    // See if the user ID in the payload exists in our database
    if (user) {
      // If it does, call 'done' with that other
      done(null, user);

    } else {
      // otherwise, call done without a user object
      done(null, false);
    }
  })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
