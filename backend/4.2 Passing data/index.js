import express from "express";

const app = express();
const port = 3000;

// Built-in middleware instead of body-parser
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  // const {fName,lName}=req.body;
  // const nameSize=fName.length+lName.length;
  const nameSize=req.body["fName"].length+req.body["lName"].length;
  res.render("index",{numLetters: nameSize});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});