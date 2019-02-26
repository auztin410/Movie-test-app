var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MovieListSchema = new Schema({
    movieId: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    release: {
        type: String
    },
    rating: {
        type: String
    },
    runtime: {
        type: String
    },
    directed: {
        type: String
    },
    actors: {
        type: String
    },
    plot: {
        type: String
    },
    awards: {
        type: String
    },
    metaScore: {
        type: String
    },
    imdbRating: {
        type: String
    },
    poster: {
        type: String
    },
    genre: {
        type: String
    },
    similar: {
        type: Array
    }

});

var MovieList = mongoose.model("MovieList", MovieListSchema);

module.exports = MovieList;