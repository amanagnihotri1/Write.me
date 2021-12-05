const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Aman:Chaikidukan1@cluster0.kwlnx.mongodb.net/blogPost?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.once('open',function()
{
    console.log("we are connected");
});
