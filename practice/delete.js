const express=require("express");
const app=express();
// //object bna rhe like array just neeche vali line se 
app.use(express.json());
let students=[
    {id:1,name:"vaishnavi",marks:60,city:"agra"},
    {id:2,name:"manvi",marks:70,city:"hyderabad"},
    {id:3,name:"apeksha",marks:80,city:"mumbai"}
];
//view student help of get method
app.get("/students" ,(req,res)=>{
     res.json(students);
});
//delete-remove student by id
app.delete("/students/:id" ,(req,res)=>{
    const id=req.params.id;
    const index= students.findIndex((s)=>s.id==id);
    if(index===-1){
        return res.status(404).json({message:"student not found"});
    }
        if (students[index].marks > 70) {
        return res.status(400).json({
            message: "Cannot delete student with marks greater than 70"
        });
    }

    // delete student
    const deleteStudent = students.splice(index, 1);

    res.json(
        {message:"Student deleted successfully",deleteStudent:deleteStudent[0],
        });
});
app.listen(8000,()=>console.log("server started"));