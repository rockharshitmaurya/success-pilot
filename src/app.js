const express = require("express");
const app=express()
require('dotenv').config({ path: '../.env' })

require("./db/conn.js")
const User=require("./models/usermessage")
const path=require("path")
const hbs=require("hbs")
const port=process.env.PORT || 3000;

// setting the path
const staticpath=path.join(__dirname,"../public")
const templatepath=path.join(__dirname,"./templates/views")
const partialpath=path.join(__dirname,"./templates/partials")


//middleware
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")))

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine","hbs")
app.set("views",templatepath)
hbs.registerPartials(partialpath)


//get routes
app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/contact",async (req,res)=>{
    try{
        const userData=new User(req.body)
        await userData.save();
        res.status(200).render("index")
    }catch(error){
        res.status(500).send(error)
    }
})

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})