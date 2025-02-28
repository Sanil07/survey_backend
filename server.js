const express = required("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = required("cors");

const adminRoutes = required("./routes/adminRoutes");


dotenv.config();

const app = express();
//middleware
app.user(cors());
app.user(express.json());

//routes 
app.use("/admin",adminRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrLpasrser:true,
    useUnifiedTopology:true,})
    .then(()=>console.log("connected to mongoDB"))
    .catch((err)=>console.log(err));

app.get("/",(req,res)=>{
    res.send("welcome to admin panel");
});

const PORT =process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});