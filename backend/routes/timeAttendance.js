const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async (req, res) => {
    const timeAttendance = await db.timeAttendance.findAll({
        include: {model: db.person, attributes: ['name', 'surname']}
    });
    res.send(timeAttendance)
})

router.get('/:id', async (req, res) => {
    const personId = req.params.id;
    const timeAttendance = await db.timeAttendance.findAll({where: {personId,}})
    res.status(200).send(timeAttendance);
})

router.post('/', (req, res) => {
    const date = new Date;

    const day = date.getDate();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const hourString = String(date.getHours())
    const minuteString = String(date.getMinutes())

    const hour = hourString.length === 1 ? '0' + hourString : hourString;
    const minute = minuteString.length === 1 ? '0' + minuteString : minuteString;
    const clockIn = `${hour}.${minute}`

    const personId = req.body.personId;

    db.timeAttendance.create({
        date: `${month[date.getMonth()]} ${day}`,
        clockIn,
        personId,

    })

        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})

router.put('/', async (req, res) => {
    const date = new Date;

    const hourString = String(date.getHours())
    const minuteString = String(date.getMinutes())

    const hour = hourString.length === 1 ? '0' + hourString : hourString;
    const minute = minuteString === '00'? '00': minuteString.length === 1 ? '0' + minuteString : minuteString;

    const id = req.body.id

    const remark = req.body.remark;

    const check = await db.timeAttendance.findOne({
         where: { id: id },
         include: {model: db.person, attributes: ['name', 'surname']}
        })

    const workingTime = () => {
        const splitClockIn = check.clockIn.split('.');
        const clockInHour = splitClockIn[0];
        const clockInMinute = splitClockIn[1];
        const clockInTotalMinute = (Number(clockInHour) * 60) + Number(clockInMinute);

        const clockOutTotalMinute = (Number(hour) * 60) + Number(minute);

        const calculate = clockOutTotalMinute - clockInTotalMinute;
        const minuteFraction = String(calculate % 60);
        const resultHour = Math.floor(calculate / 60)

        const resultMinute = minuteFraction === '00'? '00': minuteFraction.length === 1? '0' + minuteFraction:  minuteFraction
        
        return `${resultHour}.${resultMinute}`
    }
    await db.timeAttendance.update({
        clockOut: `${hour}.${minute}`,
        remark,
        workingTime: workingTime(),

    },
        { where: { id: id } })

        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})








module.exports = router;