const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    id: { type : Number, required : true, unique : true},
    emailAdress : {type: String, required : true, unique : true },
    password: { type : String, required : true}
})

module.exports = mongoose.model("User", userShema);