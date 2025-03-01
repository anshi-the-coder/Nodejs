const express = require("express");
const path = require('path')
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter') 
const URL = require("./models/url");

const app = express();
const PORT = 8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short_url").then(() =>
  console.log("Mongodb connected")
);

app.set('view engine','ejs')
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use("/url", urlRoute);
app.use("/", staticRoute)

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // This ensures the updated document is returned
    );

    // Check if entry is null
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
