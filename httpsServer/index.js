const http= require("http"); // http is a built in module
const fs= require("fs")
const url= require("url")

const myServer = http.createServer((req, res)=>{     // it takes callback function which can process my incoming request
    if(req.url==="/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true)
    console.log(myUrl)
    fs.appendFile("log.txt", log, (err, data)=>{
        switch(myUrl.pathname){
            case '/': 
            res.end("HomePage")
            break
            case '/about':
                const username= myUrl.query.myname;
                 res.end(`Hi, ${username}`)
            break
            case '/search':
            const search= myUrl.query.search_query
            res.end("Here are your result for"+ search)
            default:
                res.end("404 Not Found")
        }
        res.end('Hello From Server Again')
    }); 
    })

myServer.listen(8000,()=> console.log("Server Started!"))