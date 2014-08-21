var express = require("express");
var app = express();
var hits = 0;
var names = {
	"Alex's-Deli": 0,
	"Herp-Derp": 0,
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
	response.send("Thanks you for voting\n " + request.params.name + " now has " + names[request.params.name] + " votes." + "<a href='/'>Back to Home</a>");
	response.end();
});

app.use(function(request, response, next) {
	var keys = Object.keys(names);
	keys = shuffle(keys).slice(0, 2);
	response.send("two names: <br/><a href='/vote/" + keys[0] + "'>" + keys[0] + "</a>" + " -vs- " + "<a href='/vote/" + keys[1] + "'>" + keys[1] + "</a>");
	response.end();
});

app.listen(3000, function() {
	console.log("Listening on port 3000.");
});

function shuffle(array) {
	var copy = [],
		n = array.length,
		i;
	// While there remain elements to shuffle…
	while (n) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * array.length);
		// If not already shuffled, move it to the new array.
		if (i in array) {
			copy.push(array[i]);
			delete array[i];
			n--;
		}
	}
	return copy;
}