
const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    postname:String,
    postContent:String,
    img:
    {
        data: Buffer,
        contentType: String
    },
});
const blog=mongoose.model('blog',blogSchema);
module.exports=blog;