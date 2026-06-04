import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.argv[2] || process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relative = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const filePath = normalize(join(root, relative));
  return filePath.startsWith(root) ? filePath : join(root, "index.html");
}

createServer((req, res) => {
  const filePath = resolvePath(req.url || "/");
  const pathToServe = existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(root, "index.html");
  const type = types[extname(pathToServe)] || "application/octet-stream";

  res.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  createReadStream(pathToServe).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`FluentLoop PWA running at http://127.0.0.1:${port}`);
});
