const express = require("express");
const serverConfig = require("./config");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

