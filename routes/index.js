const routes = require('express').Router();

const catsController = require('../controller/cats')

routes.get("/cats/all", catsController.getAll);
routes.get("/cats", catsController.getByName);
routes.get("/cats/totalweight", catsController.getTotalWeight);

routes.post("/cats", catsController.add);

routes.put("/cats/:id", catsController.edit);

routes.delete("/cats/:id", catsController.remove);

module.exports = routes