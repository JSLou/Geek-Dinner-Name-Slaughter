var express = require("express");
var app = express();
var hits = 0;

app.use("/favicon.ico", function(req, res, next) {
	res.end();
});

app.use(function(req, res, next) {
	hits++;
	res.send("Hello JSLou! hits: " + hits);
	res.end();
});

app.listen(3000, function() {
	console.log("Listening on port 3000.");
});

