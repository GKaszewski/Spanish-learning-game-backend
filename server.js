const express = require( "express" );
const app = express();
var env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
const db = require('./database');

//Routes
const wordRoutes = require('./routes/word.route');

app.use(express.json());
app.use('/api/word', wordRoutes);
app.get("/", async(req, res)=> {
    await db.authenticate();
    res.send('Hello, this is spanish learning game backend!');
});

app.listen(config.server.port);