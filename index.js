const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let currentStatus = { status: "ok" };

app.post("/trigger", (req, res) => {
  const data = req.body;

  console.log("Received data from NodeMCU:", data);

  if (data.status === "interrupted") {
    console.log("Laser interrupted!");
    currentStatus = { status: "interrupted" };
  } else {
    currentStatus = { status: "ok" };
  }

  res.json({ message: "Data received successfully", received: data });
});

app.get("/status", (req, res) => {
  res.json(currentStatus);
});

app.get("/", (req, res) => {
  res.send("NodeMCU server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
