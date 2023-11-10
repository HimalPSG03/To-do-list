const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var listItems=[];
var workItems=[];
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


app.listen(3000, function(){
    console.log("the server is running on port 3000");
});

app.get("/", function(req,res){
    var today = new Date();
    var options = {
                     weekday: 'long',
                    //year: 'numeric', 
                    month: 'long',
                    day: 'numeric' 
                    };
    var message = today.toLocaleString("en-US",options);
    res.render("list",{listTitle : message , newListItems : listItems});
    
});

app.get("/work",function(req,res){
    res.render("list",{listTitle : "Work" , newListItems : workItems});
});

// app.post("/work",function(req,res){
//     let item = req.body.t1;
//     workItems.push(item);
//     res.redirect("/work");
// })

app.post("/",function(req,res){
    let item = req.body.t1;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
         listItems.push(item);
        res.redirect("/");
    }
   
});