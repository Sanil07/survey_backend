const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register",async (req ,res )=>{
    try{
        const {email ,password} =req.body;
        const existingAdmin= await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists"});

        }
        const newadmin =new Admin({email,password});
        await new Admin.save();
        res.status(201).json({
            message:"admin created successfully",
        });
    }
        catch(error){
            res.status(500).json({message:"server error ",error})
        }
        
    });

router.post("/login",async (req ,res)=>{
    try{
        const{email ,password}=req.body;
        const admin= await Admin.findOne({email});
        if(!admin){ 
            return res.status(400).json({message:"invalid credentials"});

        }
        const isMatch = await bcrypt.compare(password,admin.password);
    if (isMatch){
        return res.status(400).json({message:"invalid credentials"});

    }
    const token = jwt.sign({id:admin.id,email:admin}, "12345678",{expiresIn:"1h"});
    res.status(200).json({token, "message":"login successful"});

    }
    catch(error){
        res.status(500).json({message:"server error ",error})

    }
});
module.exports = router;
