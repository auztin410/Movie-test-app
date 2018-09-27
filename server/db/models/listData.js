var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ListDataSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },
    director: {
        type: String
    },
    directorData: {
        type: Number
    },
    runtime: {
        type: String
    },
    runtimeData: {
        type: Number
    },
    rating: {
        type: String
    },
    ratingData: {
        type: Number
    },
    genre: {
        type: String
    },
    genreData: {
        type: Number
    }
});

var ListData = mongoose.model("ListData", ListDataSchema);

module.exports = ListData;