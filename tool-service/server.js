import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

// Load tools from JSON file
const toolsData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "tools-seed.json"), "utf8"));

// Routes

// Get all tools
app.get("/tools", (req, res) => {
  res.json(toolsData);
});

// Get featured tools
app.get("/tools-featured", (req, res) => {
  const featured = toolsData.filter(tool => tool.featured);
  res.json(featured);
});

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "Tool service is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Tool Service running: http://localhost:${PORT}`);
});
