const routes = require("express").Router();
const peopleController = require("../controller/PeopleController");

routes.get("/all", peopleController.getAll);
routes.post("/", peopleController.add);
routes.put("/:id", peopleController.edit);
routes.post("/adopt/:id/:catId", peopleController.adopt);
routes.delete("/:id", peopleController.remove);

module.exports = routes;
