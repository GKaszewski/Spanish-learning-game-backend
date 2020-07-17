const routes = require('express').Router();
const db = require('../database');
const Word = require('../models/word.model');

routes.get('/', async(req, res)=>{
    await db.sync();
    let data = await Word.findAll();
    res.send(data);
});

routes.post('/new', async(req, res)=>{
    await db.sync();
    let data = req.body;
    res.send(data);
});

module.exports = routes;