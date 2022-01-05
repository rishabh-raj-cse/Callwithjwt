const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

}); // end of UserSchema


// Create Model
const User = mongoose.model('users', UserSchema);


// Export Model
module.exports = User;


