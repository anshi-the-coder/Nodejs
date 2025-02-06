import express from "express";
import fs from "fs";
import mongoose from"mongoose";
const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));
console.log(users);
const app = express();
const PORT = 8000;
// Connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log('MongoDb Connected'))
.catch(err =>console.log('Mongo Error',err))
// Schema
const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobTitle:{
    type:String, 
  },
  gender:{
    type:String,
  },
},{ timestamps:true})

const User = mongoose.model('user', userSchema)

// Middleware-Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// Routes

app.get("/users", async (req, res) => {
  const allDbUsers= await User.find({})
  const html = `
  <ul>
  ${allDbUsers.map((user) => `<li>${user.firstName}- ${user.email}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

// Rest API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
    return res.json(user);
  })
  .patch(async (req, res) => {
   await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"})
    res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({ status: "Success" });
  });
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
  //  !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ){
    return res.status(400).json({ msg: "All fields are req..." })
  }
  const result= await User.create({
    firstName: body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,
  })
  console.log("result",result)
    return res.status(201).json({msg:'Success'})
  })

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
