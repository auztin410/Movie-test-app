var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
    user: {
        type: String
    },
    name: {
        type: String
    }
});

var Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;