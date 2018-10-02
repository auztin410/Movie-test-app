var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PlaylistMoviesSchema = new Schema({
    playlist: {
        type: String
    },
    movie: { type: Schema.Types.ObjectId, ref: 'MovieList'}
});

var PlaylistMovies = mongoose.model("PlaylistMovies", PlaylistMoviesSchema);

module.exports = PlaylistMovies;