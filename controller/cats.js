let cats = [];

module.exports = {
  getAll: (req, res, callback) => {
    if (cats.length === 0)
      res.status(404).json({
        message: "Nada aqui",
      });

    res.status(200).json(cats);
  },
  getByName: (req, res, callback) => {
    const { name: queryName } = req.query;

    if (!queryName) {
      return res.status(400).json({
        message: "Nome é obrigatório",
      });
    }

    const lowercaseName = queryName.toLowerCase();
    const cat = cats.filter(cat =>
      cat.name.toLowerCase().includes(lowercaseName)
    )[0];

    if (!cat || cat.length === 0)
      return res.status(404).json({
        message: "Gato não encontrado",
      });

    res.status(200).json(cat);
  },
  getTotalWeight: (req, res, callback) => {
    const totalWeight = cats.reduce((acc, curr) => acc + curr?.weight, 0);

    res.status(200).json(parseInt(totalWeight));
  },
  add: (req, res, callback) => {
    const { name, color, weight } = req.body;

    if (!name || !color || !weight)
      return res.status(400).json({
        message: "Os campos name, color e weight são obrigatórios",
      });

    const cat = { id: cats.length, name, color, weight };
    cats.push(cat);

    res.status(200).json(cat);
  },
  remove: (req, res, callback) => {
    const { id } = req.params;
    if (id) {
      const idInt = parseInt(id);
      cats = cats.filter(cat => cat.id !== idInt);
      res.status(204).json();
    } else {
      return res.status(400).json({
        message: "Id é obrigatório",
      });
    }
  },
  edit: (req, res, callback) => {
    const { id } = req.params;
    const { name, color, weight } = req.body;

    if (!id)
      return res.status(400).json({
        message: "Gato não encontrado",
      });

    const idInt = parseInt(id);
    cats = cats.map(cat =>
      cat.id === idInt
        ? {
          ...cat,
          name: name || cat.name,
          color: color || cat.color,
          weight: weight || cat.weight,
        }
        : cat
    );

    res.status(200).json(cats);
  }
}