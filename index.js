var express = require("express");
var app = express();
var hits = 0;
var names = {
	"Alex's-Deli": 0,
	"Herp-Derp": 0,
	"function.length": 0
};

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var session = require("express-session");
app.use(session({
	secret: "JSLOU FOREVAHHH!!!1",
	resave: true,
	saveUninitialized: true
}));

var users = {
	"aaron": "secret"
};
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy({
	usernameField: "user",
	passwordField: "password"
}, function(user, password, done) {
	if (users[user] === password) {
		done(null, user);
	} else {
		done(null, false);
	}
}));
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(id, done) {
	done(null, id);
});
app.use(passport.initialize());
app.use(passport.session());


app.get("/login", function(request, response, next) {
	response.send("<html><head><title></title></head><body><form action='/login' method='post'><input type='text' name='user'><input type='password' name='password'><input type='submit'></form></body></html>");
});

app.post("/login", 
		 passport.authenticate("local", { 
			 successRedirect: "/", 
			 failureRedirect: "/login" }));

app.get("/favicon.ico", function(request, response, next) {
	response.end();
});

app.get("/reset", function(request, response, next) {
	hits = 0;
	response.redirect("/");
});

app.get("/names", function(request, response, next) {
	response.set({
		"Content-Type": "application/json"
	});
	response.json(names);
});

// fixme: this should probably be post
app.use("/vote/:name", function(request, response, next) {
	if (!names[request.params.name]) {
		names[request.params.name] = 0;
	}
	names[request.params.name]++;
	response.send("Thanks you for voting\n " + request.params.name + " now has " + names[request.params.name] + " votes." + "<a href='/'>Back to Home</a>");
	response.end();
});

app.get("/", function(request, response, next) {
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
