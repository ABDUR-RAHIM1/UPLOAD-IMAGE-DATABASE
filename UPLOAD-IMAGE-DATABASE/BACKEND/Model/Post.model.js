const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    name : {
         type : String,
         required : true
    },
    email : {
         type : String,
         required : true
    },
    image : {
         type : String,
         required : true
    }
})

const PostFile = mongoose.model("postFile", PostSchema)
module.exports = PostFile;