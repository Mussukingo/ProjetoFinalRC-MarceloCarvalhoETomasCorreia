const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const jogosPath = path.join(__dirname, "jogos.json");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

let jogos = [];

try {
  jogos = JSON.parse(fs.readFileSync(jogosPath, "utf8"));
} catch (error) {
  console.error("Não foi possível ler jogos.json:", error.message);
}

function save() {
  fs.writeFileSync(jogosPath, JSON.stringify(jogos, null, 2), "utf8");
}

app.get("/api/jogos", (req, res) => {
  res.json(jogos);
});

app.get("/", (req, res) => {
  res.send("Servidor a funcionar.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app, jogos, save };