const express = require( "express" );
const app = express();
const path = require('path');
var env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
const db = require('./database');

//Routes
const wordRoutes = require('./routes/word.route');
const userRoutes = require('./routes/user.route');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));
app.use('/api/word', wordRoutes);
app.use('/', userRoutes);
app.get("/", async(req, res)=> {
    await db.authenticate();
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.listen(config.server.port);