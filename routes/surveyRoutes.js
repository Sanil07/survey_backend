const express =require("express");
const Survey=require("../models/survey.js");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");


router.post("/survey ",async (req,res)=>{
 try{
    const{name, gender, nationality, email, countryCode, phoneNumber, address, message}=req.body;
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
    res.status(500).json({message:"Server error",error});
 }
})

router.get("/survey ",authMiddleware,async (req,res)=>{
   try{
      const surveys =await Survey.find();
      res.status(200).json(surveys);
   }
   catch(error){
      res.status(500).json({message:"Server error",error});
   }
})




module.exports = router;
