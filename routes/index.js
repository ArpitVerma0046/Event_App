var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
	User     = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){	
	res.redirect("/events");	
});


//=====================
//AUTHENTICATION ROUTES
//=====================

// show register form
router.get("/register", function(req, res){
	res.render("register");
});

// handle sign up request
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username}); //save username and hashed password in DB
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");   
        }
        passport.authenticate("local")(req, res, function(){  // local stragety
           res.redirect("/events");                           // secret page
        });
    });
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handle login request
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/events",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/events");
});

module.exports = router;

