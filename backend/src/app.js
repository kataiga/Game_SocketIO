//module imports
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { Server } = require("socket.io");
const https = require("https");
const fs = require("fs");

//import of the db connection and seeders
const db = require("./models");
const { createSeeds, deleteSeeds } = require("./models/seeders");

const app = express();

//init of variables
const PORT = 3030;

const server = https.createServer(
  {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/wam.doggo-saloon.net/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/wam.doggo-saloon.net/fullchain.pem"
    ),
  },
  app
);
const io = new Server(server, { cors: { origin: "*" } });

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//import des routes
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);
app.use("/api/api", userRouter);

//controller
const playerHandlers = require("./socketio/playerHandler");

//socket.io gestion
const onConnection = (socket) => {
  playerHandlers(io, socket);
};

io.on("connection", onConnection);

const seed = process.argv[2];
if (seed) {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      seed === "create" ? createSeeds() : deleteSeeds();
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

//export the app to make it accesible to mocha tests
module.exports = app;
