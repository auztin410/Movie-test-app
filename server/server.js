// Loading environmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const cheerio = require('cheerio');
const axios = require('axios');
const MongoStore = require('connect-mongo')(session)
const mongoose = require("mongoose");
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport');
const app = express();
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

;

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser



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
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})


var MovieList = require("./db/models/movielist");
var Upcoming = require('./db/models/upcoming');
var Playlist = require('./db/models/playlist');
var PlaylistMovies = require('./db/models/playlist-movies');
var Autocomplete = require('./db/models/autocomplete');
var Voting = require('./db/models/voting');



// Routes

// Adding Movie to Autocomplete
app.post("/autocomplete", function (req, res) {
	Autocomplete.create(
		{
			movieId: req.body.movieId,
			title: req.body.title,
			year: req.body.year
		}

	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Getting all autocomplete suggestions
app.get("/autocomplete", function (req, res) {
	Autocomplete.find({})
		.then(dbItem => res.json(dbItem))
		.catch((err) => res.json(err));
});

// Creating new playlist
app.post("/playlist", function (req, res) {
	Playlist.create(
		{
			user: req.body.user,
			name: req.body.name
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Adding movie to playlist
app.post("/playlist/add", function (req, res) {
	PlaylistMovies.create(
		{
			playlist: req.body.playlist,
			movie: req.body.movie
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Pulling movies from specific playlist
app.get("/playlist/:playlist", function (req, res) {
	PlaylistMovies.find(
		{ playlist: req.params.playlist }
	).populate('movie')
		.then(dbItem => res.json(dbItem))
		.catch((err) => res.json(err));
});

// Get all playlist for user
app.get("/playlists/:user", function (req, res) {
	Playlist.find(
		{ user: req.params.user }
	).then(dbItem => res.json(dbItem))
		.catch((err) => res.json(err));
});

// Delete a playlist
app.delete("/playlist/delete/:id/", function (req, res) {
	Playlist.findOneAndRemove(
		{_id: req.params.id}
	).then( PlaylistMovies.remove(
		{playlist: req.params.id}
	).then(dbItem => res.json(dbItem))
		.catch((err) => res.json(err)));	
});

// Delete a movie from a playlist
app.delete("/movie/:movie/:id/", function (req, res) {
	PlaylistMovies.findOneAndRemove(
		{playlist: req.params.id, movie: new mongoose.mongo.ObjectID(req.params.movie)}		
	).then(dbItem => res.json(dbItem))
	.catch((err) => res.json(err));
});

// Findoneandupdate for movielist.
app.post("/movie", function (req, res) {
	console.log(req.body);
	MovieList.findOneAndUpdate(
		{ movieId: req.body.movieId },
		{
			$set: {
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
		},
		options = { upsert: true, new: true, setDefaultsOnInsert: true },


	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

app.get("/movie/:movieId", function (req, res) {
	MovieList.find(
		{ movieId: req.params.movieId }
	).then(dbItem => res.json(dbItem))
		.catch((err) => console.log(err));
});

app.get("/random", function (req, res) {
	MovieList.find({})
		.then(dbItem => res.json(dbItem))
		.catch((err) => console.log(err));
});

app.get("/userlist/:userId", function (req, res) {
	List.find(
		{ userId: req.params.userId }
	).then(dbItem => res.json(dbItem))
		.catch((err) => console.log(err));
});

app.get("/scrape", function (req, res) {
	axios.get("https://www.imdb.com/movies-coming-soon/?ref_=nv_mv_cs").then(function (result) {
		var $ = cheerio.load(result.data);
		$("td.overview-top").each(function (i, element) {
			var result = {};

			result.title = $(this)
				.children("h4")
				.text();

			// console.log(result.title);

			movie = result.title.replace(")", "").split(" (");

			console.log(movie);

			let queryUrl = `https://www.omdbapi.com/?t=${movie[0]}&y=${movie[1]}&plot=short&apikey=trilogy`;
        	console.log("HTTPS is now active!");

			axios.get(queryUrl).then((res) => {
				if( res.data.Response == "True") {
					if (res.data.Title == "N/A"){}
					else if (res.data.Poster == "N/A"){}
					else {
						console.log(res.data.Title);
						console.log(res.data.Poster);
						var result = {title: res.data.Title, link: res.data.Poster}
						Upcoming.findOneAndUpdate(
							{title: result.title},
							{
								$set: {
									title: result.title,
									link: result.link,
								}
							},
							options = { upsert: true, new: true, setDefaultsOnInsert: true },
						)
						.then(function (upcomingMovie) {
							console.log(upcomingMovie);
						})
						.catch(function (err) {
							console.log("error");
							console.log(err) ;
						});
					}
					
				}
				
			});

			
		});

		
	});
});

app.post("/empty", function (req, res) {
	Upcoming.remove({})
	.then(function (result) {
		res.json(result);
	})
	.catch(function (err) {
		res.json(err);
	});
});

app.get("/upcoming/list", function (req, res) {
	Upcoming.find({})
		.then(function (result) {
			res.json(result);
		})
		.catch(function (err) {
			res.json(err);
		});
});


app.post("/userlistcreate", function (req, res) {
	List.create(
		{
			userId: req.body.userId
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Create Voting for multi device
app.post("/voting/create", function (req, res) {
	Voting.create(
		{
			name: req.body.name,
			code: req.body.code
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Add movie to multi device voting
app.post("voting/add", function (req, res) {
	Voting.findOneAndUpdate(
		{ name: req.body.name },
		{
			$push: {
				title: req.body.title,
				poster: req.body.poster,
				votes: 0
			}
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Open multi device voting
app.post("voting/open", function (req, res) {
	Voting.findOneAndUpdate(
		{ name: req.body.name },
		{
			$set: {
				voting: true
			}
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// Handle multi device vote

// Handle closing the voting

// Handle pulling the results

// if no API routers are hit, send the React App
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
