import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const POST_DIR = path.join(__dirname, "post");

/* Parse Front Matter */
function parseToolFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parts = raw.split("---");

  if (parts.length < 3) return null;

  const metadata = JSON.parse(parts[1].trim());
  const content = parts.slice(2).join("---").trim();

  return { metadata, content };
}

/* HOME */
app.get("/", (req, res) => {
  const files = fs.readdirSync(POST_DIR);

  const tools = files
    .filter(f => f.endsWith(".html"))
    .map(file => {
      const slug = file.replace(".html", "");
      const parsed = parseToolFile(path.join(POST_DIR, file));
      if (!parsed) return null;

      return { slug, ...parsed.metadata };
    })
    .filter(Boolean)
    .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));

  const categories = [...new Set(tools.map(t => t.category))];

  res.render("index", { tools, categories });
});

/* TOOL PAGE */
app.get("/tool/:slug", (req, res) => {
  const filePath = path.join(POST_DIR, `${req.params.slug}.html`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Tool not found");
  }

  const parsed = parseToolFile(filePath);

  res.render("tool", {
    title: parsed.metadata.title,
    content: parsed.content
  });
});

/* SETTINGS PAGE */
app.get("/settings", (req, res) => {
  res.render("settings");
});

app.listen(3000, () =>
  console.log("🔥 Running on http://localhost:3000")
);
