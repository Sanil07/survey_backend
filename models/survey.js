const mongoose = require('mongoose');

const surveySchema =new mongoose.Schema({
name:{type:String,required:true},
gender:{type:String,enum:["Male","Female","other"],required:true},
nationality:{type:String,required:true},
email:{type:String,required:true,unique:true,match:[/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/]},
countrycode:{type:String,enum:["+91","+1","+44","+61","+971","+65","+60","+81","+86","+82","+66","+92","+94","+880","+977"],required:true,default:"+91"},
phoneNumber:{type:String,required:true,match:[/^[0-9]{10}$/]},
address:{type:String,required:false},
message:{type:String,required:false},
createdat:{type:Date,default:Date.now},
});

const Survey = mongoose.model('Survey',surveySchema);
module.exports = Survey;