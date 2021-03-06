const express = require("express");
const app = express();
const port = 30;
const routes = require("./routes");

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
