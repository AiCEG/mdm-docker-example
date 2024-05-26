const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis",
  port: 6379,
});

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) {
      res.send("Error fetching data from Redis");
      return;
    }

    visits = visits ? parseInt(visits) + 1 : 1;
    client.set("visits", visits);
    res.send(`Number of visits is ${visits}`);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
