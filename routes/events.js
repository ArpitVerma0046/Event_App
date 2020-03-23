var express = require("express"),
    router = express();
	Event  = require("../models/event");


// INDEX ROUTE
router.get("/", function(req,res){
		Event.find({}, function(err, allEvents){
			if(err){
				console.log("EROOR!");
			} else{
				res.render("index", {events: allEvents});
			}
			
		});
	});

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
	// render us a form 
	res.render("new");                    	
	});

// CREATE ROUTE
router.post("/", function(req, res){
	// cutting wings of javascript
	req.body.event.body = req.sanitize(req.body.event.body);
	// create a new event and add to database
	Event.create(req.body.event, function(err, newEvent){
		if(err){
			console.log("ERROR!");
		}
		// redirect to index route
		else{
			res.redirect("/events");
		}
	});

});


// SHOW ROUTE
router.get("/:id",isLoggedIn, function(req, res){
	// show info about a particular event
	Event.findById(req.params.id, function(err, foundEvent){
		if(err){
			// redirect back to index page
			res.redirect("/events");
		}
		else{
			res.render("show", {event: foundEvent});
		}
	});
		
});

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
	// give us the edit form for an event
    Event.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/events");
        } else {
            res.render("edit", {event: foundBlog});
        }
    });
})

// UPDATE ROUTE
router.put("/:id", function(req, res){
	// cutting wings of javascript
	req.body.event.body = req.sanitize(req.body.event.body);
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedBlog){
      if(err){
          res.redirect("/events");
      }  else {
          res.redirect("/events/" + req.params.id);
      }
   });
});

// DELETE ROUTE
router.delete("/:id", function(req, res){
   //destroy event
   Event.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/events");
       } else {
           res.redirect("/events");
       }
   });
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/events");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;