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

app.post("/api/jogos", (req, res) => {
  const { id, name, genre } = req.body;

  if (id === undefined || !name?.trim() || !genre?.trim()) {
    return res.status(400).json({ error: "id, name e genre são obrigatórios" });
  }

  if (jogos.some((jogo) => String(jogo.id) === String(id))) {
    return res.status(409).json({ error: "Já existe um jogo com esse id" });
  }

  const novoJogo = { id, name: name.trim(), genre: genre.trim() };
  jogos.push(novoJogo);

  try {
    save();
    res.status(201).json(novoJogo);
  } catch (error) {
    jogos.pop();
    res.status(500).json({ error: "Não foi possível guardar o jogo" });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor a funcionar.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app, jogos, save };