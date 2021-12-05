const dotenv = require("dotenv");
dotenv.config()
const multer=require("multer");
const db=require('./model/mongoose');
const fs=require("fs");
const path=require("path");
const express = require("express");
const blog=require('./model/Blog');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { lowerCase } = require("lodash");
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null,"images");
  },
  filename: (req, file, cb) => {
      cb(null,file.fieldname +"-"+Date.now());
  },
});
var upload = multer({ storage: storage});
app.get("/post/:a",function(req,res)
{ const postid=req.params.a;
  
  blog.findOne({_id:postid},function(err,foundresult)
  {
if(err)
    {
      console.log("error,Can't show results");
    }
else
  {
    console.log(foundresult.img);
  return res.render("post",{articleim:foundresult,articlename:foundresult,artpost:foundresult});
    
}
  });
   
});
app.get("/home",function(req,res)
{
  blog.find({},function(err,allpost)
  {
if(err)
    {
      console.log("error,Can't Load Blogs");
    }
else
  {
     return res.render("home",{title:allpost,newpost:allpost}); 
    }
  });
});
app.get("/contact",function(req,res)
{
res.render("contact");
})
app.get("/about", function(req, res) {
  
  res.render("about");
})
app.get("/compose",function(req,res)
{
  res.render("compose");
});
app.post("/compose",upload.single("uploaded_file"),function(req,res,next)
{
  var p=req.body.text;
  var q=req.body.textin;
  blog.create ({
     postname:p,
     postContent:q,
     img:{
      data: fs.readFileSync(path.join(__dirname +"/images/" + req.file.filename)),
      contentType:"image/png"
  }
    },
   function(err,newpost) {  
     if(err)
    {
      console.log("error in Creating Post");
      return;
    }
    else
    { 
      console.log("blog saved successfully");
    }   
});

  res.redirect("/home");
});
app.listen(process.env.PORT || 4000,function() {
  console.log("Server started on port 4000");
});
