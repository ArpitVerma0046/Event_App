 mongoose = require("mongoose");

// MONGOOSE/MODEL CONFIG
var eventSchema = new mongoose.Schema ({
	title: String,
	image: String,
	body:  String,
	created:  {type: Date, default: Date.now }	
});
module.exports  = mongoose.model("Event", eventSchema);

