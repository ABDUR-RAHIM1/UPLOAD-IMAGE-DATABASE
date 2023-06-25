const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())  
const PostFile = require('./Model/Post.model');

// home route 
app.get("/", (req, res) => {
      res.sendFile(__dirname + '/view/index.html')
})



// get image 
app.get("/getImg", async(req, res)=>{
      try {
       const post =  await PostFile.find()   
       res.status(200).json({message :"Get Image successfully " ,post})
      } catch (error) {
            console.log(error)
      }
})

/// uplaodes image routes 

app.post('/upload', async(req, res)=>{
      const body = req.body
       
      try {
             const newPost = PostFile({
                   name : body.name,
                   email : body.email,
                   image : body.image
             });
             const post = await newPost.save()
             res.status(201).json({message : "post done", newPost})
      } catch (error) {
            res.status(500).json({message : "interna; server erro", error})
      }
})


// error handler
app.use((req, res, next) => {
     res.send("page not found")
})
module.exports = app;