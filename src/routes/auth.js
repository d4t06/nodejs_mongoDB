const express = require("express");
const router = express.Router();
// const Account = require("../app/models/Accounts")
const passport = require("passport");
const FacebookStrategy = require('passport-facebook');



// #######

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

passport.use(new FacebookStrategy({
    clientID: "1584980145346361",
    clientSecret: "ce34fc4c4f3919f1b240a3ab23525c41",
    callbackURL: "https://9597-2402-800-6342-e405-2923-f28e-a137-d68.ap.ngrok.io/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos',],
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
  }
 ));


router.get("/facebook", passport.authenticate("facebook"));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {

    const user = req.user
    // create session
    req.session.isLogin = user
    // Successful authentication, redirect home.
    res.redirect("/");
  });




module.exports = router;
