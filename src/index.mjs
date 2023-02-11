// Antônio Ivo da Silva Gomes
// José Fhilipe Martins Coelho

import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database('eleicoes2022-pi.db', (err) => {
  if (err) {
    console.log(err.message);
  }
});
const port = 3000;

function formatedRes(rows) {
  return rows.map(cand => {
    return {
      name: cand.cand_nome,
      role: cand.cargo_nome,
      votes: cand.cand_votos,
      status: cand.cand_status === 1 ? 'Eleito' : 'Não Eleito'
    }
  });
}

app.use(express.static('public'));

app.get('/name', (req, res) => {
  const name = req.query.search.toUpperCase();
  const query = `
    select cand_nome, cargo_nome, cand_votos, cand_status from votos_cand_estado where cand_nome like '%' || ? || '%'
  `;

  db.all(query, [name], (err, rows) => {
    if (err) {
      throw Error(err.message);
    }

    res.json(formatedRes(rows));
  });
});

app.get('/role/:cargoId', (req, res) => {
  const query = `
    select cand_nome, cand_votos, cand_status from votos_cand_estado where cargo_id = ?
  `;

  db.all(query, [req.params.cargoId], (err, rows) => {
    if (err) {
      throw Error(err.message);
    }

    res.json(formatedRes(rows))
  });
});

app.get('/roles', (req, res) => {
  const query = `select * from cargo order by nome`;

  db.all(query, (err, rows) => {
    if (err) {
      throw Error(err.message);
    }

    res.json(rows)
  })
});

app.get('/city', (req, res) => {
  const query = `
    select cand_nome, cand_votos, cand_status from votos_cand_municipio where muni_nome like '%' || ? || '%'
  `;

  db.all(query, [req.query.search.toUpperCase()], (err, rows) => {
    if (err) {
      throw Error(err.message);
    }

    res.json(formatedRes(rows))
  });
});

app.get('/cities', (req, res) => {
  const query = `select id, nome from municipio order by nome`;

  db.all(query, (err, rows) => {
    if (err) {
      throw Error(err.message);
    }

    res.json(rows)
  })
})

app.get('/candidates/:onlyElecteds', (req, res) => {

  const query = `
    select cand_nome, cand_votos, cand_status
    from votos_cand_estado
    ${(req.params.onlyElecteds == 1)? 'WHERE cand_status = 1':''}
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      throw ERROR(err.message);
    }

    res.json(formatedRes(rows));
  })
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
