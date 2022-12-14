const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/course_resource", {useNewUrlParser: true});



const router = express();

//router.set('view engine', 'ejs');
//router.set('view engine', 'handlebars');

router.use(bodyParser.urlencoded({extended: true}));

//let posta=[]

const courses={
  title:String,
  resource:String
}

const Courses=mongoose.model("Courses",courses)

router.get("/",function(req,res){
   Courses.find({},function(err,courses){
    res.render("courselists",{hsc:"Courses",Newcourses:courses})
})
})



router.get("/AddResource",function(req,res){
  res.render("addresources")
})
router.get("/resources/:t",function(req,res){
  const resourceId=req.params.t
  Courses.findOne({_id:resourceId},function(err,courses){
    res.render("new",{
      title:courses.title,
      resource:courses.resource
    })
  })
})

router.post("/AddResource",function(req,res){
  const course_list=new Courses({
    title:req.body.comp,
    resource:req.body.compbody
  })

  course_list.save()
  res.redirect("/")
})


module.exports = router;
