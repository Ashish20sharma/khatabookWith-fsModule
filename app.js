const express=require("express");
const app=express();
const indexRoute=require("./routes/index");
const path=require("path");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',indexRoute);


app.listen(5000,()=>{
    console.log("app listening on port 4000")
})