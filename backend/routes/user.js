const express = require('express')
const router = express.Router();
const db = require('../models')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const {count, row} = await db.user.findAndCountAll()

    const checkUser = await db.user.findOne({ where: { username, } })
    if (checkUser) {
        res.status(400).send({ message: 'username already used' })
    } else {
        const salt = bcryptjs.genSaltSync(12)
        const hashedPassword = bcryptjs.hashSync(password, salt)

        await db.user.create({
            username,
            password: hashedPassword,
            role,
            userId: String(Number(count + 1))
            
        })
        await db.person.create({
            id: String(Number(count + 1)),
            name: username,
            userId: String(Number(count + 1)),
        })
        res.status(200).send({ message: 'user created' })
    }
})


router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await db.user.findOne({ where: { username: username } })
    if (!user) {
        res.status(400).send('Invalid username')
    } else {
        const isPassword = bcryptjs.compareSync(password, user.password);

        if (!isPassword) {
            res.status(400).send({ message: 'Invalid Password' })
        } else {
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role,

            }
            const token = jwt.sign(payload, 'myPersonalProject', { expiresIn: '1h' })
            res.status(200).send(token)
            // res.status(200).send({ message: 'login completed' })
        }
    }
})

module.exports = router;