const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const activitySchema = new Schema ({
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        bcrypt: true,
        rounds: 10
    },
});

activitySchema.plugin(require('mongoose-bcrypt'));


const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity