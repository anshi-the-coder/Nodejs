const http= require("http"); // http is a built in module
const fs= require("fs")

const myServer = http.createServer((req, res)=>{     // it takes callback function which can process my incoming request
    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    fs.appendFile("log.txt", log, (err, data)=>{
        switch(req.url){
            case '/': 
            res.end("HomePage")
            break
            case '/about':
                 res.end("I am Anshika Gangwar")
            break
            default:
                res.end("404 Not Found")
        }
        res.end('Hello From Server Again')
    }); 
    })

myServer.listen(8000,()=> console.log("Server Started!"))