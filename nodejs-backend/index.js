const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const { PORT } = require("./config/serverConfig.js");
const ApiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
  // create the express object
  const app = express();
  app.use(cors());
  app.use(bodyparser.json());

  app.use("/api", ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Started server at ${PORT}`);
  });
};

setupAndStartServer();
