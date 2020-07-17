const routes = require('express').Router();
const db = require('../database');
const Word = require('../models/word.model');

routes.get('/', async (req, res) => {
    await db.sync();
    let data = await Word.findAll();
    res.send(data);
});

routes.post('/new', async (req, res) => {
    await db.sync();
    let data = req.body;
    let newWord = await Word.findOrCreate({
        where: {
            Spanish: data['Spanish']
        },
        defaults: {
            Spanish: data['Spanish'],
            English: data['English'],
        }
    }).then(result => {
        var created = result[1];

        if (!created) {
            return res.send('Word already exists in database!');
        }
    });
    return res.send(newWord.toJSON());
});

routes.post('/new/json', async (req, res) => {
    await db.sync();
    let data = req.body;
    let words = [];
    for (const word of data) {
        await Word.findOrCreate({
            where: {
                Spanish: word['Spanish']
            },
            defaults: {
                Spanish: word['Spanish'],
                English: word['English'],
            }
        }).then(result => {
            var actualWord = result[0];
            var created = result[1];

            if (created) {
                words.push(actualWord);
            }
        });
    }
    return res.send(`Added: ${words.length} new words!`);
});

module.exports = routes;