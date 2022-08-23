const fs = require("fs");
const peer = require("peer");

const server = new peer.PeerServer({
  port: 3031,
  ssl: {
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/wam.doggo-saloon.net/fullchain.pem"
    ),
    key: fs.readFileSync(
      "/etc/letsencrypt/live/wam.doggo-saloon.net/privkey.pem"
    ),
  },
});
server.on("connection", (id) => {
  console.log("new connection with id " + id.id);
});
server.on("disconnect", (id) => {
  console.log("new disconnection with id " + id.id);
});

console.log("peer server running on port 3031");
