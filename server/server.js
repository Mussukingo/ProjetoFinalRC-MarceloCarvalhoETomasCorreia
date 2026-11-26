const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

function page(title, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
</head>
<body>
<h1>${title}</h1>
${body}
</body>
</html>`;
}

app.get("/", (req, res) => {
  res.send(
    page(
      "PhanSite Server",
      "<p>Server is running.</p>"
    )
  );
});

app.use((req, res) => {
  res.status(404).send(
    page(
      "404",
      `<p>No route found for <code>${req.url}</code>.</p>`
    )
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});