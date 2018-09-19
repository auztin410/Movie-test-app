var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UpcomingSchema = new Schema({
    title: {
        type: String,
        
        
    },
    link: {
        type: String,
        index: {
            unique: true,
        }
    }
});

var Upcoming = mongoose.model("Upcoming", UpcomingSchema);

module.exports = Upcoming;