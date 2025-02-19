const shortid = require("shortid")
const URL = require("../models/url") 
async function handleGenerateNewShortURL(req, res){
    const body = req.body
    if(!body.url) return res.status(400).json({error: 'url is requireed'})
    const shortId = shortid()

    const response=await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [], 
    })

    console.log(response)

    return res.json({id: shortId})
}

module.exports = {
    handleGenerateNewShortURL,
}