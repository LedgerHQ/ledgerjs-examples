const carlo = require("carlo");
const path = require("path");

(async () => {
  const app = await carlo.launch();
  app.on("exit", () => process.exit());
  app.serveFolder(path.join(__dirname, "dist"));
  await app.load("index.html");
})();
