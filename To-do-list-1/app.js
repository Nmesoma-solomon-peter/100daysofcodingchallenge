// requring external and internal modules;
const express = require('express');
const bodyparser = require('body-parser');
const titleday = require(__dirname+"/date.js");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'))

const newitem = [];
const newWorkItem = [];
//home get route
app.get("/",function(req,res){
    const date = titleday.getDate()
    res.render('list',{
        title:date,
        doThis:newitem
    })
});

//home post route
app.post("/",function(req,res){
    const formInput = req.body.itemInput;
    if(req.body.button === "Work"){
        newWorkItem.push(formInput)
        res.redirect('/Work')
    }else{
        newitem.push(formInput)
        res.redirect('/')
    }
    
});

// work get route
app.get('/work',function(req,res){
    res.render('list',{
        title:"Work",
        doThis:newWorkItem
    });
});


app.listen(process.env.PORT||3000,function(){
    console.log("app running on port 3000: ok");
})
