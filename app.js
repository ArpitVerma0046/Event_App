var express 			=     		require("express"),
    bodyParser			=  		    require("body-parser"),
    mongoose 			=    		require("mongoose"),
	passport 			=			require("passport"),
	LocalStrategy		=			require("passport-local"),
	User				=			require("./models/user"),
	Event    			=			require("./models/event"),
	methodOverride 		=   		require("method-override"),
	expressSanitizer	=  			require("express-sanitizer"),
	app					=      	  	express();

//requring routes
var eventRoute = require("./routes/events"),
    indexRoute     = require("./routes/index");
   
	
// APP CONFIG
mongoose.connect("mongodb://localhost: 27017/restful_event_app", {useNewUrlParser: true}); 
app.set("view engine", "ejs");                             // it will tell express that we are using ejs
app.use(bodyParser.urlencoded({extended: true}));         // body parser for extracting data from form
app.use(expressSanitizer());                             // it comes after body parser and sanitize input
app.use(express.static("public"));                      // to serve our stylesheets
app.use(methodOverride("_method"));   				   // it will tell express to use methodOverride



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){                      // Our own middleware
	res.locals.currentUser = req.user;				  //  req.user contains username and _id
	next();
});
 // requiring routes
app.use(indexRoute);
app.use("/events", eventRoute);

app.listen(3000, function(){
	console.log("Server has started");
	
});

