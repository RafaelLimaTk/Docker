const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "fullcycle",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", (req, res) => {
  const name = `User ${Math.floor(Math.random() * 1000)}`;
  connection.query(
    `INSERT INTO people (name) VALUES ('${name}')`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err.toString());
      }

      connection.query("SELECT name FROM people", (err, results, fields) => {
        if (err) {
          return res.status(500).send(err.toString());
        }

        const names = results.map((row) => row.name).join("<br>");

        res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
