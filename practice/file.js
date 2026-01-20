const fs = require("fs");
const { markAsUncloneable } = require("worker_threads");
//const promises =require("fs"). promises

//create file with SYNC
//const r=fs.writeFileSync("./file.txt", "HEY THIS IS MANVI");
//Async
// fs.writeFile("./file.txt","WELCOME TO GLA UNIVERSITY",(err)=>{});

//read file with sync
// const result=fs.readFileSync("./notes.txt","utf8");
// console.log(result);

// //read file with async
// fs.readFile("./notes.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log(result);
//     }
// });

//fs.appendFileSync("./file.txt",new Date().getDate().toLocaleString());

// fs.appendFileSync("./file.txt",`${Date.now()} Hey manvi \n`);

//copy file
// fs.cpSync("./file.txt","./file_copy.txt");

//delete file
// fs.unlinkSync("./file_copy.txt");

// console.log(fs.statSync("./file.txt"));
//to check it is file or not

// console.log(fs.statSync("./file.txt").isFile());


// CREATE DIRECTORY

// fs.mkdirSync("./New folder")

//remove directory
// fs.rmdirSync("./New folder");

//read direcctory jitni bhi file h .txt vo sb dekh skte h 
// fs.readdir("./",(err,files)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log("Files",files);
//     }
// });