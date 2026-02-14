const express = require("express");
const app = express();

app.use(express.json());

let credentials = [
  { email: "john@email.com", password: "123" },
  { email: "alex@email.com", password: "456" },
];

// get users
app.get("/auth/users", (req, res) => {
  res.json({ message: "User fetched successfully", credentials });
});

// reset password route
app.put("/auth/reset", (req, res) => {
  const { email, password, newPassword } = req.body;
//forgot password
app.put("/auth/forgot",(req,res)=>{
  const {email,newPassword}=req.body;
  const user=credentials.find((cred)=>cred.email==email);
  if(!user){
    return res.status(400).json({message:"Email not found"});
  }
  user.password=newPassword;
  res.json({message:"password reset via forgot password",user})
})
  // find user
  const user = credentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // update password
  user.password = newPassword;

  res.json({ message: "Password reset successful" });
});

app.listen(8080, () => console.log("Server is running on port 8080"));
