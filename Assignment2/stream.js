//const fs = require("fs");
// const readStream=fs.createReadStream("./sample.txt",{
//     encoding:"utf-8",
//     highWaterMark:64*1024
// });
// readStream.on("data",(chunk)=>{
//     console.log("chunk received:",chunk.length)
// });
// readStream.on("end",()=> {
//     console.log("File reading complete")
// });

//write stream
// const writeStream=fs.createWriteStream("./sample.txt");
// writeStream.write("Hello GLA\n");
// writeStream.write("Welcome to Mathura\n");
// writeStream.end();

//transform stream
// const {Transform}=require("stream");
// const upperCaseTransform=new Transform({
//     transform(chunk,encoding,callback){
//         const modifiedData=chunk.toString().toUpperCase();
//         this.push(modifiedData);
//         callback();
//     }
// })
// //Piping
// fs.createReadStream("./sample.txt")
// .pipe(upperCaseTransform)
// .pipe(fs.createWriteStream("./log.txt"));

//file copy using stream , inputtxt file bnao , output.txt , copy krdo vo data  pipe ko use krke usko read krna h 
const fs =require("fs");
const readStream=fs.createReadStream("./input.txt",{
    encoding:"utf-8"
});
const writeStream=fs.createWriteStream("./output.txt");
readStream.pipe(writeStream);
console.log("File copied using stream and pipe");