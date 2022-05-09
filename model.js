const mongoose = require("mongoose");
const bcrypt = require('bcrypt')


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
    },
});

activitySchema.pre('save', function(next){
    if(!this.isModified('password'))
    return next();
    bcrypt.hash(this.password,10,(err,passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next()
    });
});

activitySchema.methods.comparePassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,isMatch) => {
        if(err)
            return callback(err)
        else {
            if(!isMatch)
                return callback(null, isMatch)
            return callback(null, this)
        }
    })
}

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity