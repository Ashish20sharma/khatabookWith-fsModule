const express=require("express");
const router=express.Router();
const fs=require("fs");

router.get("/",function(req,res){
    res.render("home");
})

router.get("/create",function(req,res){
    res.render("createHisaab");
})

router.get("/showhisaab",function(req,res){
    res.render("showHisaab");
})
router.post("/create",(req,res)=>{
    const {heading,hisaab}=req.body;
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1; // Months are zero-based, so add 1
    const year = new Date().getFullYear(); // Get the full year
    // Pad the day and month with leading zeros if necessary
    const dayString = day < 10 ? '0' + day : day.toString();
    const monthString = month < 10 ? '0' + month : month.toString();
    const fn=`${dayString}-${monthString}-${year}.txt`;
    fs.writeFile(`./files/${fn}`,hisaab,(err)=>{
        if(err){
           return console.log("error in write file.")
        }
        console.log("done");
    });
    res.redirect("/showhisaab");
})

module.exports=router;