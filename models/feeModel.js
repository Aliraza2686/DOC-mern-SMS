const mongoose = require('mongoose')

const feeSchema = new mongoose.Schema({
        isFullyPaid : {
            type : Boolean
        },
        total : {
            type : Number
        },
        paid : {
            type : Number
        },
        remaining : {
            type : Number
        },
        installments : [{
           payment : {
            type : Number
           },
           paidAt : {
            type : Date
           }
        }],
        student : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Student'
        }
})

const Fee = mongoose.model('Fee', feeSchema)

module.exports = Fee