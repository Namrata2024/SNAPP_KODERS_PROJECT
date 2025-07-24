const express = require("express");
const mongoose = require('mongoose');
const http = require("http");
const bodyparser = require("body-parser");
const cors = require("cors");
const { PORTS,PORT } = require("./config/serverConfig.js");
const ApiRoutes = require("./routes/index");
const expenseRoutes = require('./routes/expense');
const bachatSaathiService = require('./service/bachatSaathiService');

const setupAndStartServer = async () => {
  // create the express object
  const app = express();
  app.use(cors());
  app.use(bodyparser.json());
  app.use("/api", ApiRoutes);
  app.use('/api/expenses', expenseRoutes);
  app.use('/api/bachatSaathi', bachatSaathiService);

  mongoose.connect('mongodb+srv://expenseUser:Code3022*@hackathoncluster.g7zvcw6.mongodb.net/?retryWrites=true&w=majority&appName=HackathonCluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  //Create servers on multiple ports with error handling
  PORTS.forEach(port => {
    try {
      const server = http.createServer(app);
      server.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
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
