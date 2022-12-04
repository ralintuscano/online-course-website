const express=require("express")
const bodyparser=require("body-parser")
const date=require(__dirname+"/date.js")
const app=express()


app.set("view engine","ejs")

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
let a=[]
let resourceitems=[]
app.get("/resource_list",function(req,res){
 let day=date.getDate()
      res.render("addr",{listtitle:day,newlistresource:a})
})

app.post("/resource_list",function(req,res){

  let a1=req.body.newadd
  a.push(a1)
 res.redirect("/resource_list")
  
})

app.listen(3000,function(){
    console.log(`server started on port 3000 http://localhost:3000/resource_list`)
})
