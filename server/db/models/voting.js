var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VotingSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    code: {
        type: String
    },
    options: {
        type: Array
    },
    voting: {
        type: Boolean,
        default: true
    }
});

var Voting = mongoose.model("Voting", VotingSchema);

module.exports = Voting;