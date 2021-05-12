const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Required"]
    },
    email: {
        type: String,
        required: [true, "Required"]
    },
    password: {
        type: String,
        required: [true, "Required"]
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User