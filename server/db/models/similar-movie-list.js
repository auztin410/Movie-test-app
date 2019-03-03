var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SimilarMovieListSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: "MovieList"},
    similarId: {
        type: String
    },
    upVote: {
        type: Number
    },
    downVote: {
        type: Number
    },
    userIds: {
        type: Array
    }
});

var SimilarMovieList = mongoose.model("SimilarMovieList", SimilarMovieListSchema);

module.exports = SimilarMovieList;