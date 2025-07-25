const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const bodyparser = require("body-parser");
const cors = require("cors");
const { PORTS, PORT, MONGO_DB_CONN } = require("./config/serverConfig.js");
const ApiRoutes = require("./routes/index");
const expenseRoutes = require("./routes/expense");
const authRoutes = require("./routes/auth");
const bachatSaathiService = require("./service/BachatSaathiService.js");

const setupAndStartServer = async () => {
  // create the express object
  const app = express();
  app.use(cors());
  app.use(bodyparser.json());
  app.use("/auth", authRoutes);
  app.use("/api", ApiRoutes);
  app.use("/api/expenses", expenseRoutes);
  app.use("/api/bachatSaathi", bachatSaathiService);

  mongoose.connect(MONGO_DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //Create servers on multiple ports with error handling
  PORTS.forEach((port) => {
    try {
      const server = http.createServer(app);
      server.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
      server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`Port ${port} is already in use. Skipping this port.`);
        } else {
          console.error(`Error starting server on port ${port}:`, err);
        }
      });
    } catch (err) {
      console.error(`Exception while starting server on port ${port}:`, err);
    }
  });
};

setupAndStartServer();
