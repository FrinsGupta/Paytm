require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const User = mongoose.model("Users", UserSchema)

module.exports = {User}