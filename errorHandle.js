const express = require("express");
const port = 4000;

const app = express();

// const a = '50';

app.get("/", (req, res) => {
  res.send(a);
});

app.use("/", (err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
