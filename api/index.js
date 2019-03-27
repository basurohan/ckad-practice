const express = require('express');
const keys = require('./keys');
const app = express();
const { Pool } = require('pg');

// Postgres Client Setup
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDatabase,
    password: keys.pgPassword
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
    .query('CREATE TABLE IF NOT EXISTS messages (message VARCHAR(50))')
    .catch(err => console.log(err));

app.get("/message", async (req, res) => {
    const toReturn = await pgClient
                            .query('SELECT * from messages')
                            .catch(err => console.log(err));
    res.send(toReturn.rows);
});

app.get("/insert", async (req, res) => {
    await pgClient
    .query("INSERT INTO messages (message) VALUES('Hi, message from Postgres')")
    .catch(err => console.log(err));
    res.send("message added");
});

app.post("/message", async (req, res) => {
    const message = req.body.message;
    await pgClient.query('INSERT INTO messages (message) VALUES($1)', [message]);
    res.send({added: true});
});

app.listen(5000, () => console.log("Listening on Port: 5000"));