import express from "express";
import morgan from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World"
  });
});

app.get("/contact/:username", (req, res) => {
  const { username } = req.params;  //dynamic routing

  res.status(200).json({
    success: true,
    message: `My name is ${username}`
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});