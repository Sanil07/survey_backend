const express =require("express");
const Survey=require("../models/survey.js");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");


router.post("/survey",async (req,res)=>{
 try{
    const{name, gender, nationality, email, countryCode, phoneNumber, address, message}=req.body;
    if (!name || !gender || !nationality || !email || !countryCode || !phoneNumber){
      return res.status(400).json({message:"All fields are required"});
    }
    if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){
      return res.status(400).json({message:"Invalid email"});
    }
    if(!phoneNumber.match(/^[0-9]{10}$/)){
      return res.status(400).json({message:"Invalid phone number"});
    }
    const exisstinSurveyemail =await Survey.findOne({email});
    const exisstinSurveyPhone =await Survey.findOne({phoneNumber});
    if(exisstinSurveyemail || exisstinSurveyPhone){
      return res.status(400).json({message:"Survey already exists"});
    }
    const newSurvey = new Survey({
        name, 
        gender,
        nationality, 
        email, 
        countryCode, 
        phoneNumber, 
        address, 
        message
    })
    await newSurvey.save();
    res.status(201).json({message:"Survey created successfully"});
 }
 catch(error){
    res.status(500).json({message:"Server error",error:error.message});
 }
})

router.get("/survey",authMiddleware,async (req,res)=>{
   try{
      const surveys =await Survey.find();
      res.status(200).json(surveys);
   }
   catch(error){
      res.status(500).json({message:"Server error",error});
   }
})




module.exports = router;
