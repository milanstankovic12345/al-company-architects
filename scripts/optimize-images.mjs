// Generates responsive WebP + AVIF variants for the site's photos.
// Usage: npm run images  (output is committed, so the build does not need sharp)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SOURCES = ["src/assets/hero-architecture.jpg", "src/assets/products", "src/assets/stock"];
const OUT = "src/assets/generated";
const WIDTHS = [400, 800, 1280];

const slug = (s) =>
  s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const files = SOURCES.flatMap((p) =>
  fs.statSync(p).isDirectory()
    ? fs.readdirSync(p).filter((f) => /\.(jpe?g|png)$/i.test(f)).map((f) => path.join(p, f))
    : [p],
);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const manifest = {};
for (const file of files) {
  const key = slug(path.basename(file));
  const { width, height } = await sharp(file).metadata();
  // never upscale: cap at the source width
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))];
  for (const w of widths) {
    const img = sharp(file).resize({ width: w });
    await img.clone().webp({ quality: 78 }).toFile(`${OUT}/${key}-${w}.webp`);
    await img.clone().avif({ quality: 55, effort: 4 }).toFile(`${OUT}/${key}-${w}.avif`);
  }
  manifest[key] = { width, height, widths };
  console.log(key, `${width}x${height}`, widths.join("/"));
}
fs.writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2) + "\n");
