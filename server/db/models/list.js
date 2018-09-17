var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ListSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },
    list: {
        type: Array
    },
    wantToSee: {
        type: Array
    },
});

var List = mongoose.model("List", ListSchema);

module.exports = List;