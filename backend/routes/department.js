const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', (req, res) => {
    db.department.findAll()
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})

router.post('/', (req, res) => {
    const department = req.body.department
    db.department.create({
        department: department
    })
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})

router.put('/', (req, res) => {
    const department = req.body.department;
    const id = req.body.id
    db.department.update({ department: department }, { where: { id: id } })
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})

router.delete('/', (req, res) => {
    const id = req.body.id
    db.department.destroy({ where: { id: id } })
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})





module.exports = router;