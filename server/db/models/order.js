var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Order = new Schema({
    title: {
        type: String
    },
    release: {
        type: Date
    },
    rating: {
        type: String
    },
    runtime: {
        type: Number
    },
    directed: {
        type: String
    },
    actors: {
        type: Array
    },
    plot: {
        type: String
    },
    awards: {
        type: String
    },
    metaScore: {
        type: Number
    },
    imdbRating: {
        type: Number
    },
    poster: {
        type: String
    },
    genre: {
        type: Array
    },
    series: {
        type: String
    },
    order: {
        type: Number
    }
})