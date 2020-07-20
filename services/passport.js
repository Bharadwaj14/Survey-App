const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const User = mongoose.model('users');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const client = new MongoClient(keys.mongoURI, { useNewUrlParser: true });

passport.serializeUser((user, done)=>{
        done(null, user.id);
});

passport.deserializeUser((id, done)=>{
      User.findById(id).then(user=>{
            done(null, user);
      });
});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL : '/auth/google/callback',
    proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            console.log(profile.id);
                User.findOne({googleID:profile.id}).then(existingUser =>{
                    if(existingUser){
                        //user exists
                        done(null, existingUser);
                    }
                    else{
                        new User({googleID : profile.id}).save().
                        then( user => 
                            done(null, user));
                    }
                });      
    })
);  