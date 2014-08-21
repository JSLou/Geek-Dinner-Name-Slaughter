var express = require("express");
var app = express();
var hits = 0;
var names = {
	"Alex's Deli": 0,
	"Herp Derp": 0,
	"function.length": 0
};

app.use("/favicon.ico", function(request, response, next) {
	response.end();
});

app.use("/reset", function(request, response, next) {
	hits = 0;
	response.redirect("/");
});

app.use("/names", function(request, response, next) {
	response.set({
		"Content-Type": "application/json"
	});
	response.json(names);
});

app.use("/vote/:name", function(request, response, next) {
	if (!names[request.params.name]) {
		names[request.params.name] = 0;
	}
	names[request.params.name]++;
	response.send("Thanks you for voting\n " + request.params.name + " now has " + names[request.params.name] + " votes.");
	response.end();
});

app.use(function(request, response, next) {
	hits++;
	response.send("Hello JSLou! hits: " + hits);
	response.end();
});

app.listen(3000, function() {
	console.log("Listening on port 3000.");
});