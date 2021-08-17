const CatsRepository = require("../repository/CatsRepository");
const HTTP_ERROR = require("../utils/httpErrors");

module.exports = {
  getAll: async (req, res, callback) => {
    const response = await CatsRepository.getAll();

    if (response.length === 0)
      res.status(HTTP_ERROR.NOT_FOUND).json({
        message: "Nada aqui",
      });

    res.status(HTTP_ERROR.SUCCESS).json(response);
  },
  getByName: async (req, res, callback) => {
    const { name } = req.query;

    if (!name) {
      return res.status(HTTP_ERROR.BAD_REQUEST).json({
        message: "Nome é obrigatório",
      });
    }

    const response = await CatsRepository.getByName(name);
    if (!response || response.length === 0)
      return res.status(HTTP_ERROR.NOT_FOUND).json({
        message: "Gato não encontrado",
      });

    res.status(HTTP_ERROR.SUCCESS).json(response);
  },
  getCatsToAdopt: async (req, res, callback) => {
    const response = await CatsRepository.getCatsToAdopt();
    if (!response || response.length === 0)
      return res.status(HTTP_ERROR.NOT_FOUND).json({
        message: "Todos os gatos já foram adotados!",
      });

    res.status(HTTP_ERROR.SUCCESS).json(response);
  },
  getTotalWeight: async (req, res, callback) => {
    const { total } = await CatsRepository.getTotalWeight();
    res.status(HTTP_ERROR.SUCCESS).json(parseInt(total));
  },
  add: async (req, res, callback) => {
    const { name, color, weight } = req.body;

    if (!name || !color || !weight)
      return res.status(HTTP_ERROR.BAD_REQUEST).json({
        message: "Os campos name, color e weight são obrigatórios",
      });

    const cat = { name, color, weight };

    const response = await CatsRepository.add(cat);
    const { affectedRows } = response;

    res
      .status(
        affectedRows === 0
          ? HTTP_ERROR.INTERNAL_SERVER_ERROR
          : HTTP_ERROR.SUCCESS_NO_CONTENT
      )
      .json();
  },
  remove: async (req, res, callback) => {
    const { id } = req.params;
    if (id) {
      const response = await CatsRepository.remove(id);
      res
        .status(
          response === 0 ? HTTP_ERROR.NOT_FOUND : HTTP_ERROR.SUCCESS_NO_CONTENT
        )
        .json();
    } else {
      return res.status(HTTP_ERROR.BAD_REQUEST).json({
        message: "Id é obrigatório",
      });
    }
  },
  edit: async (req, res, callback) => {
    const { id } = req.params;
    const { name, color, weight } = req.body;

    if (!id)
      return res.status(HTTP_ERROR.BAD_REQUEST).json({
        message: "Id é obrigatório",
      });

    const response = await CatsRepository.edit({ id, name, color, weight });

    res
      .status(response === 0 ? HTTP_ERROR.NOT_FOUND : HTTP_ERROR.SUCCESS)
      .json();
  },
};
