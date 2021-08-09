const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let cats = [];

app.get("/cats", (req, res) => {
  if (cats.length === 0)
    res.status(404).json({
      message: "Nada aqui",
    });

  res.status(200).json(cats);
});

app.get("/cat", (req, res) => {
  const { name: queryName } = req.query;

  if (!queryName)
    res.status(400).json({
      message: "O nome é obrigatório",
    });

  const lowercaseName = queryName.toLowerCase();
  const cat = cats.filter(cat =>
    cat.name.toLowerCase().includes(lowercaseName)
  )[0];

  if (!cat || cat.length === 0)
    return res.status(404).json({
      message: "Gato não encontrado",
    });

  const { name, color, weight } = cat;

  res.status(200).json({
    color,
    name,
    weight,
  });
});

app.get("/cats/totalweight", (req, res) => {
  const totalWeight = cats.reduce((acc, curr) => acc + curr.weight, 0);

  res.status(200).json(totalWeight);
});

app.post("/cat", (req, res) => {
  const { name, color, weight } = req.body;

  if (!name || !color || !weight)
    return res.status(400).json({
      message: "Os campos name, color e weight são obrigatórios",
    });

  const cat = { id: cats.length, name, color, weight };
  cats.push(cat);

  res.status(200).json(cat);
});

app.delete("/cat/:id", (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      message: "Id é obrigatório",
    });

  cats = cats.map(cat => cat.id !== id);
  res.status(204).json();
});

app.put("/cat/:id", (req, res) => {
  const { id } = req.params;
  const { name, color, weight } = req.body;

  if (!id)
    return res.status(400).json({
      message: "Gato não encontrado",
    });

  console.log("cats", cats);
  console.log(
    "cat",
    cats.filter(cat => cat.id === id)
  );
  cats = cats.map(cat =>
    cat.id === id
      ? {
          ...cat,
          name: name || cat.name,
          color: color || cat.color,
          weight: weight || cat.weight,
        }
      : cat
  );

  res.status(200).json(aff);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
