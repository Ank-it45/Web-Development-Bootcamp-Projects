import express from "express";
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    res.send("<h1>hello dear<h1>"
    );
});

app.get("/contact",(req,res)=>{
    res.send("<h1>contact me :8081844008<h1>"
    );
});

app.get("/about/:usernamevar",(req,res)=>{   //created dynamic route----->  /about/:usernamevar  now whatever word is used after about/, it will run for the following funstion
    res.send(`My name is ${req.params.usernamevar}`
    );
});

app.listen(port,()=>{
    console.log(`server runnning on ${port}`);
})