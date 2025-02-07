const express=require('express')
const {connectMongoDb}=require('./routes/connection.js')
const {logReqRes}=require("./middlewares/index.js")
const fs=require('fs')

const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));
const userRouter = require("./routes/user")


console.log(users);
const app = express();
const PORT = 8000;
// Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>{
    console.log("Mongodb connected")
})

// Middleware-Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt')) 
  
// Routes

app.use("/api/users", userRouter)
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
