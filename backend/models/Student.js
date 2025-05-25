const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    usn_no:{
        type:String,
        required:true,
        unique:true,
        uppercase: true
    },
    room_no:{
        type:Number,
        required:true
    },
    batch:{
        type:Number,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    father_name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    aadhar_no:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Student = mongoose.model('student',StudentSchema);