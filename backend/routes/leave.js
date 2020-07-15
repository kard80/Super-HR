const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async (req, res) => {
    const leave = await db.leave.findAll({
        include: [{
            model: db.person,
            attributes: ['name', 'surname']
        }]
    });
    res.status(200).send(leave)
})

router.get('/:id', async (req, res) => {
    const personId = req.params.id;
    const leaveByOne = await db.leave.findAll({where: {personId,}})
    res.status(200).send(leaveByOne)
})

router.post('/', async (req, res) => {
    const type = req.body.type;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const timeStartDate = req.body.timeStartDate;
    const timeEndDate = req.body.timeEndDate;
    const reason = req.body.reason;
    const personId = req.body.personId;

    const startDateCalculation = new Date(startDate);
    const endDateCalculation = new Date(endDate);
    const oneDay = 24 * 60 * 60 * 1000

    const totalDate = Math.round(Number(((endDateCalculation - startDateCalculation) / oneDay) + 1))


    db.leave.create({
        type,
        startDate,
        endDate,
        timeStartDate,
        timeEndDate,
        reason,
        totalDate,
        personId
    })

        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})





module.exports = router;