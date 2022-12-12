//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/course_resourcelist", {useNewUrlParser: true});



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//let posta=[]

const courses={
  title:String,
  resource:String
}

const Courses=mongoose.model("Courses",courses)

app.get("/",function(req,res){
   Courses.find({},function(err,courses){
    res.render("courselist",{hsc:"Courses",Newcourses:courses})

   })

})



app.get("/AddResource",function(req,res){
  res.render("addresources")
})
app.get("/resources/:t",function(req,res){
  const resourceId=req.params.t
  Courses.findOne({_id:resourceId},function(err,courses){
    res.render("new",{
      title:courses.title,
      resource:courses.resource
    })
  })
})

app.post("/AddResource",function(req,res){
  const course_list=new Courses({
    title:req.body.comp,
    resource:req.body.compbody
  })

  course_list.save()
  res.redirect("/")
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
