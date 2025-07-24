const express = require("express");
const mongoose = require('mongoose');
const http = require("http");
const bodyparser = require("body-parser");
const cors = require("cors");
const { PORTS,PORT,MONGO_DB_CONN } = require("./config/serverConfig.js");
const ApiRoutes = require("./routes/index");
const expenseRoutes = require('./routes/expense');

const setupAndStartServer = async () => {
  // create the express object
  const app = express();
  app.use(cors());
  app.use(bodyparser.json());

  app.use("/api", ApiRoutes);
  app.use('/api/expenses', expenseRoutes);

//   app.listen(PORT, () => {
//     console.log(`Started server at ${PORT}`);
//   });

  mongoose.connect(MONGO_DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  });

  //Create servers on multiple ports
    PORTS.forEach(port => {
    http.createServer(app).listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    });

};

setupAndStartServer();
