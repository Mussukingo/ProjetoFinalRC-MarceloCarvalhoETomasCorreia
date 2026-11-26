import { useEffect, useState } from "react";
import Item from "./Item.jsx";
import CreateItem from "./CreateItem.jsx";

function App() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    async function buscarJogos() {
      try {
        setLoading(true);
        setErro(null);

        const resposta = await fetch("http://localhost:3000/api/jogos");

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        setJogos(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    buscarJogos();
  }, [versao]);

  if (loading) return <p>A carregar jogos...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <main>
      <h1>Jogos</h1>
      <CreateItem onCreated={() => setVersao((valor) => valor + 1)} />
      {jogos.map((jogo) => (
        <Item key={jogo.id} jogo={jogo} />
      ))}
    </main>
  );
}

export default App;
