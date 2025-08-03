const express=require("express");
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.json()); // For JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hi",(req,res)=>{
    res.send("Hi");;
});

app.post("/update-data",(req,res)=>{
    const {name}=req.body;
    console.log(name);
    res.send("Data received and logged");
})

app.listen(5000,()=>{
    console.log("Server started at port 5000",);
});

