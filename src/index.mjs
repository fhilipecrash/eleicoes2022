import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database('eleicoes2022-pi.db', (err) => {
  if (err) {
    console.log(err.message);
  }
});
const port = 3000;

app.use(express.static('public'));

app.get('/candidate', (req, res) => {
  db.all("select * from candidato where nome like '%' || ? || '%'", [req.query.q.toUpperCase()], (err, rows) => {
    if (err) {
      throw Error(err.message);
    }

    res.json(rows)
  })
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
