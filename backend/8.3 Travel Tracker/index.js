import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const db = new pg.Client(
  {
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "Ankit@2907#",
    port: 5432
  }
);

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited()
{
  const result=await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country)=>{
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries=await checkVisited();
  res.render("index.ejs",{
    countries: countries,
    total: countries.length
  });
});

app.post("/add",async(req,res)=>{
  const input = req.body["country"];
  try {
    const result = await db.query(
    "SELECT country_code FROM countries WHERE LOWER(country_name)='%'||$1||'%'",
    [input.toLowerCase()]
    
  );
 const data = result.rows[0];
    const countryCode=data.country_code;
  try {
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    const countries=await checkVisited();
  res.render("index.ejs",{
    countries: countries,
    total: countries.length,
    error: "country has already been added!"
  });
  }

  } catch (err) {
    console.log(err);
    const countries=await checkVisited();
  res.render("index.ejs",{
    countries: countries,
    total: countries.length,
    error: "country name doesnt exist!"
  });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
