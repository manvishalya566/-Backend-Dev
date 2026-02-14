const express=require("express");
//application level middleware
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    console.log("Request url:" ,req.url);
    console.log("Request Method:" ,req.method);
    next();
});
app.get("/home",(req,res)=>{
    res.send("Welcome home");

});
//Route level middleware

const checkLogin=(req,res,next)=>{
    const isLoggedIn=true;

    if(!isLoggedIn){
        return res.status(401).send("Please login first");
    }
    next();
};
app.get("/dashboard",checkLogin,(req,res)=>{
    res.send("Welcome to dashboard");
})
const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"token required"});
    }
    if(token!="manvi"){
        return res.status(401).json({message:"Invalid token"});
    }
    next();
}
app.get("/profile",authMiddleware,(req,res)=>{
    res.json({message:"Profilr data"});
});
// Error-Handling Middleware
app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

app.use((err, req, res, next) => {
  console.error("Error Middleware:", err.message);
  res.status(500).json({
    message: "Internal Server Error",
  });
});
app.listen(8000,()=>console.log("server started"));
