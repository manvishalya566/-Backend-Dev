const express=require("express");
const app=express();
 //Built in middleware
 app.use(express.json());
 app.use(express.urlencoded({extends:true}));

 app.set("view engine","ejs");

 app.get("/",(req,res)=>{
    res.render("index");
 });
 app.listen(8080,()=>console.log("server started"));
 