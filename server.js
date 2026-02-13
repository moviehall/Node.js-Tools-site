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

/* HOME PAGE */
app.get("/", (req, res) => {
  const files = fs.readdirSync(POST_DIR);

  const tools = files
    .filter(file => file.endsWith(".html"))
    .map(file => ({
      slug: file.replace(".html", ""),
      title: file.replace(".html", "").replace(/-/g, " ")
    }));

  res.render("index", { tools });
});

/* TOOL PAGE */
app.get("/tool/:slug", (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(POST_DIR, `${slug}.html`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Tool not found");
  }

  const content = fs.readFileSync(filePath, "utf-8");

  res.render("tool", {
    title: slug.replace(/-/g, " ").toUpperCase(),
    content
  });
});

app.listen(3000, () =>
  console.log("🔥 AI Media Studio running on http://localhost:3000")
);
