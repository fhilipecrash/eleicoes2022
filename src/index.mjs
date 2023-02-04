import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database('eleicoes2022-pi.db', (err) => {
  if (err) {
    console.log(err.message);
  }
});
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/candidate', (req, res) => {
  db.all('select * from candidato', (err, rows) => {
    if (err) {
      throw Error(err.message)
    }

    rows.forEach(row => {
      console.log(row.nome);
    })
  })
  res.json('finish')
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
