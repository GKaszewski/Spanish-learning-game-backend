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
    let newWord = await Word.create({
        spanish : data['spanish'],
        english : data['english'],
    });
    res.send(newWord.toJSON());
});

module.exports = routes;