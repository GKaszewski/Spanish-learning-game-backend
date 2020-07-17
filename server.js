const express = require( "express" );
const app = express();
var env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
const db = require('./database');

app.use(express.json());
app.get("/", async(req, res)=> {
    await db.authenticate();
    res.send('Hello, this is spanish learning game backend!');
});

app.listen(config.server.port);