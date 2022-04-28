const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema ({
    userName: {
        type: String,
        trim: true,
        required: true
    }
})

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity