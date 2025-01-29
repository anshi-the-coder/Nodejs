const { isUtf8 } = require("buffer")
const fs= require("fs")
const os = require("os")

console.log(os.cpus().length)
//console.log("1")
// //sync blocking request
// const result=fs.readFileSync("contact.txt", "utf-8");
// console.log(result);
// console.log("2")
// Async non blocking request
fs.readFile("contact.txt", "utf-8",(err, result)=>{
    //console.log(result)
})
//console.log("2")
