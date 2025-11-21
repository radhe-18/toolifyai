import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Load tools from JSON file
const toolsData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "tools-seed.json"), "utf8"));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "tools" }));

app.get("/api/tools", (req, res) => {
  const { q = "", category, pricing, tags, page = 1, limit = 120 } = req.query;
  let items = toolsData;
  if (q) {
    const s = q.toLowerCase();
    items = items.filter(t => (t.name + " " + t.description + " " + (t.tags || []).join(" ")).toLowerCase().includes(s));
  }
  if (category && category !== "All") items = items.filter(t => t.category === category);
  if (pricing && pricing !== "Any") items = items.filter(t => t.pricing === pricing);
  if (tags) {
    const tagList = String(tags).split(",");
    items = items.filter(t => tagList.every(tag => t.tags.includes(tag)));
  }
  const total = items.length;
  const skip = (Number(page)-1)*Number(limit);
  items = items.slice(skip, skip + Number(limit));
  res.json({ items, total, page: Number(page), pages: Math.ceil(total/Number(limit)) });
});

app.get("/api/tools-featured", (req, res) => {
  const items = toolsData.filter(t => t.featured).slice(0, 24);
  res.json(items);
});

app.get("/api/tools/:slug", (req, res) => {
  const tool = toolsData.find(t => t.slug === req.params.slug);
  if (!tool) return res.status(404).json({ message: "Not found" });
  res.json(tool);
});

app.post("/api/tools", (req, res) => {
  // Not implemented for static data
  res.status(501).json({ message: "Not implemented" });
});

app.post("/api/tools/bulk", (req, res) => {
  // Not implemented for static data
  res.status(501).json({ message: "Not implemented" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🔥 Tools service running on http://localhost:${PORT}`));
