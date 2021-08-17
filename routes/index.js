const routes = require("express").Router();
const catsRoutes = require("./CatsRoutes");
const peopleRoutes = require("./PeopleRoutes");

routes.use("/cats", catsRoutes);
routes.use("/people", peopleRoutes);

module.exports = routes;
