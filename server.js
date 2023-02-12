const express = require("express");
const app = express();
const path = require("path");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
var cors = require("cors");
const dayjs = require("dayjs");

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
  //res.send("Server run yat.");
});

io.on("connection", (socket) => {
  let client = socket?.handshake?.query?.client;
  console.log(
    `${client} connected at ${dayjs().format("YYYY-MM-DD hh:mm:ss")}`
  );
  // socket.on("join", function () {
  //   console.log(
  //     `${client} connected at ${dayjs().format("YYYY-MM-DD hh:mm:ss")}`
  //   );
  // });

  socket.on("disconnect", () => {
    console.log(`${client} disconnected!`);
  });

  socket.on("dispatch", async (state) => {
    io.emit("state", state);
    console.log(
      `${client} dispatch (${state ? "ON" : "OFF"}) at ${dayjs().format(
        "YYYY-MM-DD hh:mm:ss"
      )}`
    );
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`app running on port ${PORT}`));
