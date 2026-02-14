const express=require("express");
const app=express();

app.use((req,res,next)=>{
    console.log("middleware 1");
    next();
});
app.use((req,res,next)=>{
    console.log("middleware 2");
    next();
})
app.get("/test",(req,res)=>{
    res.send("Route Executed");
})
app.listen(8000,()=>console.log("server started"));