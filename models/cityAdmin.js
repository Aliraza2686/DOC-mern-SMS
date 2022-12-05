const mongoose = require('mongoose')

const cityAdminSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    city : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    position : {
        type : String,
        required  : true
    }
})

const CityAdmin = mongoose.model('CityAdmin', cityAdminSchema)

module.exports = CityAdmin