// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require("mongoose");
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// mongoose.connect("mongodb://localhost/movietestapp");

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})


var MovieList = require("./db/models/movielist");
var List = require("./db/models/list");
// Routes
app.post("/add", function (req, res) {
	console.log("req body user");
	console.log(req.body);
	List.findOneAndUpdate(
		{userId: req.body.user},
		{$addToSet: {list: {
			movieId: req.body.movieId,
			title: req.body.title,
		}}}
	).then(function(result) {
		res.json(result);
	}).catch(function(err) {
		res.json(err);
	});
});

app.post("/wanttosee", function (req, res) {
	console.log("req body");
	console.log(req.body)
	List.findOneAndUpdate(
		{userId: req.body.user},
		{$addToSet: {
			wantToSee: {
				movieId: req.body.wantToSee,
				title: req.body.title
		}}}
	).then(function(result) {
		res.json(result);
	}).catch(function(err) {
		res.json(err);
	});
});

app.post("/movie", function (req, res) {
	console.log(req.body);
	MovieList.create(
		{
			movieId: req.body.movieId,
			title: req.body.title,
			release: req.body.release,
			rating: req.body.rating,
			runtime: req.body.runtime,
			directed: req.body.directed,
			actors: req.body.actors,
			plot: req.body.plot,
			awards: req.body.awards,
			metaScore: req.body.metaScore,
			imdbRating: req.body.imdbRating,
			poster: req.body.poster,
			genre: req.body.genre
		}

	).then(function(result) {
		res.json(result);
	}).catch(function(err) {
		res.json(err);
	});
});

app.get("/userlist/:userId", function (req, res) {
	List.find(
		{userId: req.params.userId}
	).then(dbItem => res.json(dbItem))
	.catch((err) => console.log(err));
});



app.post("/userlistcreate", function (req, res) {
	List.create(
		{
			userId: req.body.userId
		}
	).then(function(result) {
		res.json(result);
	}).catch(function(err) {
		res.json(err);
	});
});

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
