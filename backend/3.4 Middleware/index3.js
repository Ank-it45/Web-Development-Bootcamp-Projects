import express from "express";
import morgan from "morgan";

const app = express();

// Built-in middleware
app.use(express.json());

// Logger middleware
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World"
  });
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});