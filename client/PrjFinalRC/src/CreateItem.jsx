import { useState } from "react";

function CreateItem({ onCreated }) {
  const urlJogos = "http://localhost:3000/api/jogos";

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [criado, setCriado] = useState(false);
  const [erro, setErro] = useState(0);

  const submitJogo = async (event) => {
    event.preventDefault();

    if (!name.trim() || !genre.trim()) {
      setErro(1);
      setCriado(false);
      return;
    }
    
    const novoId = Math.floor(Math.random() * 10000);
    setId(novoId);

    const jogo = {
      id: Number(id),
      name: name.trim(),
      genre: genre.trim(),
    };

    try {
      const res = await fetch(urlJogos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jogo),
      });

      if (!res.ok) {
        setErro(2);
        setCriado(false);
        return;
      }

      setErro(0);
      setCriado(true);
      setId("");
      setName("");
      setGenre("");

      if (onCreated) {
        onCreated();
      }
    } catch {
      setErro(2);
      setCriado(false);
    }
  };

  return (
    <form className="jogo-form" onSubmit={submitJogo}>

      <input
        type="text"
        placeholder="Nome do jogo"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Género do jogo"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      />

      <button type="submit">Adicionar jogo</button>

      {criado && <p>✅ Jogo criado</p>}
      {erro === 1 && <p>❗Preencha todos os campos</p>}
      {erro === 2 && <p>❗Erro ao criar o jogo no servidor</p>}
    </form>
  );
}

export default CreateItem;