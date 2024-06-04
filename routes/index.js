const express=require("express");
const router=express.Router();
const fs=require("fs");
const path=require("path");

router.get("/",function(req,res){
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            return console.error(`Unable to scan directory: ${err}`);
        }
        res.render("home",{files});
    });
})

router.get("/create",function(req,res){
    res.render("createHisaab");
})

router.get("/hisaab/:hisaabid",function(req,res){
    const id=req.params.hisaabid;
    fs.readdir("./files", (err, files) => {
        if (err) {
            return console.error(`Unable to scan directory: ${err}`);
        }

            const filePath = path.join("./files", id);

            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    return console.error(`Error reading file ${filePath}: ${err}`);
                }
                res.render("showHisaab",{id,content});
            });
    });
})

router.get("/delete/:hisaabid",function(req,res){
    const id=req.params.hisaabid;
    fs.unlink(`./files/${id}`, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
            return;
        }
    });
    res.redirect("/");
})

router.get("/edit/:hisaabid",function(req,res){
    const id=req.params.hisaabid;
    res.render("editHisaab",{id});
});

router.post("/edit/:hisaabid",function(req,res){
    const {edithisaab}=req.body;
    const id=req.params.hisaabid;
    fs.readFile(`./files/${id}`, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }
    
        const newContent = data + "," +edithisaab;
    
        fs.writeFile(`./files/${id}`, newContent, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
                return;
            }
        });
    });
    res.redirect(`/hisaab/${id}`);
})

router.post("/create",(req,res)=>{
    const {hisaab}=req.body;
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
    });
    res.redirect("/");
});

router.post("/readfile",function(req,res){
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            return console.error(`Unable to scan directory: ${err}`);
        }
        res.render("showHisaab",{files});       
    });
})

module.exports=router;