const PeopleRepository = require("../repository/PeopleRepository");
const HTTP_ERROR = require("../utils/httpErrors");

module.exports = {
  getAll: async (req, res, callback) => {
    const response = await PeopleRepository.getAll();

    if (response.length === 0)
      res.status(HTTP_ERROR.NOT_FOUND).json({
        message: "Nada aqui",
      });

    res.status(HTTP_ERROR.SUCCESS).json(response);
  },
  add: async (req, res, callback) => {
    const { name, color, weight } = req.body;

    if (!name || !color || !weight)
      return res.status(HTTP_ERROR.BAD_REQUEST).json({
        message: "Os campos name, color e weight são obrigatórios",
      });

    const cat = { name, color, weight };

    const response = await PeopleRepository.add(cat);
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
      const response = await PeopleRepository.remove(id);
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

    const response = await PeopleRepository.edit({ id, name, color, weight });

    res
      .status(response === 0 ? HTTP_ERROR.NOT_FOUND : HTTP_ERROR.SUCCESS)
      .json();
  },
  adopt: async (req, res, callback) => {
    const { id, catId } = req.params;

    if (!id || !catId)
      return res.status(HTTP_ERROR.BAD_REQUEST).json({
        message: "Id e catId são obrigatórios",
      });

    const response = await PeopleRepository.adopt({ id, catId });

    res
      .status(response === 0 ? HTTP_ERROR.NOT_FOUND : HTTP_ERROR.SUCCESS)
      .json();
  },
};
