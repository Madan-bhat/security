const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let currentStatus = { status: "ok" };
let timeoutId = null; // To keep track of the timeout

app.post("/trigger", (req, res) => {
  const data = req.body;

  console.log("Received data from NodeMCU:", data);

  if (data.status === "interrupted") {
    console.log("Laser interrupted!");
    currentStatus = { status: "interrupted" };

    // Clear any existing timeout to prevent resetting an already interrupted status
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a timeout to reset the status after 30 seconds
    timeoutId = setTimeout(() => {
      console.log("Resetting status to ok");
      currentStatus = { status: "ok" };
    }, 30000); // 30 seconds
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
