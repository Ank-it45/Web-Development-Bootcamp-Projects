import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (cleaner way)
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(morgan("dev"));

// Form submit route
app.post("/submit", (req, res) => {
  const { street, pet } = req.body;

  const bandName = `${street}${pet}`;

  res.status(200).send(`
    <h1>Your band name is:</h1>
    <h2>${bandName} ✌️</h2>
  `);
});

// Port config (production-ready)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});