const routes = require('express').Router();
const db = require('../database');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var env = process.env.NODE_ENV || 'dev';
const config = require('../environment')[env];

routes.get('/users', async (req, res) => {
    await db.sync();
    let data = await User.findAll();
    res.send(data);
});

function validateUser(userData) {
    const passwordMinLimit = 8;
    if (!userData['username']) {
        return false;
    }
    else if (userData['password'].length < passwordMinLimit) {
        return false;
    } else {
        return true;
    }
}

routes.post('/auth/register', async (req, res) => {
    await db.sync();
    let data = req.body;
    const error = validateUser(data);
    if (!error) return res.status(400).send('Password is too short!');

    let checkUser = await User.findOne({
        where: {
            username: data['username']
        }
    });
    if (checkUser) return res.sendStatus(403).send("User already exists!");

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(data['password'], salt);
    let newUser = await User.create({
        username: data['username'],
        password: hashedPassword
    });

    const token = jwt.sign({ id: newUser.id }, config.secret);
    return res.send({ token: token });
});

routes.post('/auth/login', async (req, res) => {
    await db.sync();
    let data = req.body;
    
    const error = validateUser(data);
    if (!error) return res.status(400).json({
        message: 'Credentials are wrong.'
    });

    let user = await User.findOne({
        where: {
            username: data['username']
        }
    });
    if (!user) return res.status(404).send("Couldn't find user.");

    const validPassword = await bcrypt.compare(data['password'], user.password);
    if(!validPassword) return res.status(400).send('Wrong password!');

    const token = jwt.sign({id:user.id}, config.secret);
    return res.send({token: token});
});

module.exports = routes;