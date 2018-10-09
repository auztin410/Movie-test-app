var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AutocompleteSchema = new Schema({

    movieId: {
        type: String,
        unique: true,
    },
    title: {
        type: String
    },
    year: {
        type: String
    }
});

var AutoComplete = mongoose.model("Autocomplete", AutocompleteSchema);

module.exports = AutoComplete;