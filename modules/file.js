const { isUtf8 } = require("buffer")
const fs= require("fs")
// sync 
// fs.writeFileSync("./ test.txt", "modules");
// // Async
// fs.writeFile("./test.txt", "modules Async",(err)=>{})
// const result=fs.readFileSync("./contact.txt","utf-8");
// console.log(result)

// fs.readFile("./contact.txt","utf-8",(err,result) => {
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result); 
//     }
// });
fs.appendFileSync("./test.txt",`${Date.now()}Hey there\n`);
// fs.cpSync("./test.txt","./copy.txt")
// fs.unlinkSync("./copy.txt")
console.log(fs.statSync("./test.txt"));
fs.mkdirSync("my-docs")