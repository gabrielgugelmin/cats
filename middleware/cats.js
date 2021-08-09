
module.exports = {
  notFound: (req, res, callback) => {
    const { name: queryName } = req.query;
    const lowercaseName = queryName?.toLowerCase();

    const cat = cats.filter(cat =>
      cat.name.toLowerCase().includes(lowercaseName)
    )[0];

    if (cat) next();

    if (!cat || cat.length === 0)
      return res.status(404).json({
        message: "Gato não encontrado",
      });
  }
}