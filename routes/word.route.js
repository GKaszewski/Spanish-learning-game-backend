const routes = require('express').Router();
const db = require('../database');
const Word = require('../models/word.model');
const User = require('../models/user.model');

routes.get('/', async (req, res) => {
    await db.sync();
    let data = await Word.findAll();
    res.send(data);
});

async function verifyToken(req, res, next) {
    await db.sync();
    const token = req.headers['authorization'];
    if(!token) return res.sendStatus(403);

    try {
        let user = await User.findOne({
            where: {
                token: token
            }
        });

        if (!user) res.sendStatus(403);
        next();
    } catch (e) {
        console.log(e);
    }
}

routes.post('/new', verifyToken, async (req, res) => {
    await db.sync();
    let data = req.body;
    let word = null;
    await Word.findOrCreate({
        where: {
            Spanish: data['Spanish']
        },
        defaults: {
            Spanish: data['Spanish'],
            English: data['English'],
        }
    }).then(result => {
        var created = result[1];
        word = result[0];
        if (!created) {
            return res.send('Word already exists in database!');
        }
    });
    return res.send(word.toJSON());
});

routes.post('/new/json', verifyToken, async (req, res) => {
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