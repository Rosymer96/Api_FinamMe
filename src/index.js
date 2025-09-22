const express = require("express");

const cors = require("cors");

const server = express();
const PORT = 3500;

server.use(cors());
server.use(express.json());

require("dotenv").config();

const router = require("./routes/api.routes");
server.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server running http://localhost${PORT}`);
});
