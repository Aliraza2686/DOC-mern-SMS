const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  fathername : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  phoneNo : {
    type : Number,
    required : true
  },
  CNIC : {
    type : String,
    required : true
  },
  country : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  course : {
    type : String,
    required : true
  },
  training : {
    type : String,
    Enumerator : ["onsite", "online"],
    required : true
  },
  duration : {
    type : String,
    required : true
  },
  feePaid : {
    type : Boolean,
    required : true
  },
  rollno : {
    type : Number,
    required : true
  },
  instructor : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'CityAdmin'
  }

})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student