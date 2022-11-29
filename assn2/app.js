const express=require('express');
const PORT=9990;
const app=express();
const fs=require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','pug');
app.set('views','./views');


app.use(express.static('static'))
app.use("/static", express.static('public'))

app.use(express.static('images'))
app.use("/static", express.static('public/images')) //import images


app.use(express.static('static')) // import css
app.use('/',express.static(__dirname));

//define routes
app.get("/",(req,res)=>{
    res.render("home");
    
})



app.get("/contactus",(req,res)=>{
    res.render("contactus");
    
})

app.get("/aboutus",(req,res)=>{
    res.render("aboutus");
    
})

app.get("/services",(req,res)=>{
    res.render("services");
    
})

app.get("/gallary",(req,res)=>{
    const array =["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"];
    res.render("gallary",{array,array});;
    
})
app.get("/contact_details",(req,res)=>{
    // 
    var array = fs.readFileSync('users/details.txt').toString().split("\n");
    res.render('contact_details', {file : array});
  
    
})

app.post("/postdata",(req,res)=>{
    // res.render("postdata");
    let name=req.body.name;
    let comment=req.body.comment;
    let email=req.body.email;
    // res.send(`${name} ${comment}`)

    if(fs.existsSync(`users`)){

        fs.appendFile(`users/details.txt`,`\n ${name},   ${email},   ${comment}`,(err)=>{
            if(err) throw err
            else res.write("<script> alert('Thank you for contacting us')</script>;<script> location.assign('/')</script>;");
        })
       
    }
    else{
           
        res.write("<script> alert('file not found')</script>");
       
        res.end()
    
            }
    
})

app.listen(PORT,(err)=>{
    if (err) throw err;
    else console.log (`Servers is Work on ${PORT}`)
})