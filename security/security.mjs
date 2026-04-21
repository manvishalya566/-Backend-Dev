import express from 'express';
import mongoose from 'mongoose';
const app=express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth').then(() => console.log('Connected to MongoDB'));

const userSchema=new mongoose.Schema({
    username:String,
    password:String
});
const User=mongoose.model('User',userSchema);

app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username:req.body.username,password:req.body.password});
    res.status(200).json({msg:'Login successful',user:user});
});
app.get("/comments",async(req,res)=>{
    res.send(`<h1>${req.query.cm}</h1>)`);
});
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});


