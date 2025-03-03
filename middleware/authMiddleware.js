const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.js');

const authMiddleware =async (req ,res ,next)=>{
    const authHead = req.header("Authorization");
    console.log("recived athorization token");
    if(!authHead || !authHead.startsWith("Bearer ") ){
        return res.status(401).json({message:"Authorization denied"});

    }
    // console.log("authHead",authHead);

    const token=authHead.split(" ")[1];
    // console.log("token",token);
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        const user = await Admin.findById(decoded.id)
     
        if(!user)
res.status(401).json({
    message:"user not found"
})
req.user=user;
next();
        }

        catch(error){
            res.status(500).json({message:"server error",error:error.message});

    }


}
module.exports = authMiddleware;