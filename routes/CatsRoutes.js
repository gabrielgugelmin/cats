const routes = require("express").Router();

const catsController = require("../controller/CatsController");

routes.get("/all", catsController.getAll);
routes.get("/", catsController.getByName);
routes.get("/catstoadopt", catsController.getCatsToAdopt);
routes.get("/totalweight", catsController.getTotalWeight);
routes.post("/", catsController.add);
routes.put("/:id", catsController.edit);
routes.delete("/:id", catsController.remove);

module.exports = routes;
