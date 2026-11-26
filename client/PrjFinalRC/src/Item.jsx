function Item({ jogo }) {
  return (
    <article>
      <h2>{jogo.name}</h2>
      <p>ID: {jogo.id}</p>
      {jogo.genre && <p>Género: {jogo.genre}</p>}
    </article>
  );
}

export default Item;
