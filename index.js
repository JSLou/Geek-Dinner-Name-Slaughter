var express = require("express");
var app = express();

app.use(function(req, res, next) {
	res.send("Hello JSLou!");
	res.end();
});

app.listen(3000, function() {
	console.log("Listening on port 3000.");
});