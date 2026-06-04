//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port=3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const passCheck = (req,res,next)=>{
    const { password }=req.body;
    if(password!=="ILoveProg")
    {
        return res.status(401).json({
            success:false,
            message:"wrong password"
        });
    }
    next();
};

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.post("/check",passCheck,(req,res)=>{
    res.sendFile(path.join(__dirname,"public","secret.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});