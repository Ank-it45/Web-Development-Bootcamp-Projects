import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route for homepage
app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay();  //getDay() returns the day of the week as a number.

  let dayType = "a weekday";
  let advice = "It's time to work hard";

  if (day === 0 || day === 6) {
    dayType = "the weekend";
    advice = "It's time to have some fun";
  }

  res.render("index", {
    dayType,
    advice
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});