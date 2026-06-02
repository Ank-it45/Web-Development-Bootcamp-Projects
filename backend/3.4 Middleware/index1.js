import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //server ko pta chal gya ki hum kis directory mein kaam kr rhe hain
                                            //isliye ab server k paas saare files jo is folder(middleware folder) mein h unka access h
// Built-in body parser (modern way)
app.use(express.urlencoded({ extended: true })); //raw data ko parsed data mein badlta h taki server uspe kaam kr ske
app.use(express.json()); // optional but recommended

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//server k paas is file k access already h but is file k exact path server ko nhi pta h
//hum is line k use krk server ko is file k path k acess kra rhe hain taki ye browser ko is file k content ko bhej ske
//since server ko bs middleware directory k baare mein pta h isliye wo is directory se bahar k files ko access nhi kr skta
app.post("/submit", (req, res) => {
  console.log(req.body); //parsed data which will be printed on terminal
  res.send("Form submitted successfully"); //form mein action "submit" aur method "post" h to jb form submit ho gya browser chala jayega
});                                        //http://localhost:3000/submit pe html k code k wjh se aur jaise hi wo is url pe pahunchega
                                           //wo match kr jayega index1.js k routing se (app.post("/submit", (req, res) =>) jo output krega 
                                           //app.post wale method ko

app.listen(port, () => {                   
  console.log(`Listening on port ${port}`);
});
