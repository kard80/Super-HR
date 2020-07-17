const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer')
const auth = require('../config/authorize')

router.get('/', async (req, res) => {
    const personGet = await db.person.findAll({
        include: [{model: db.department, attributes: ['department']},
    {model: db.position, attributes: ['position']}]
    });
    res.status(200).send(personGet)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const personGetId = await db.person.findOne({ 
        where: { userId: id, },
        include: [{model: db.department, attributes: ['department']},
    {model: db.position, attributes: ['position']}]
    })
    res.status(200).send(personGetId)
})


router.get('/admin', auth, (req, res) => {
    const person = db.findAll();

    res.status(200).send(person)
})

router.put('/syncPosition', async (req, res) => {
    const {id, positionId} =  req.body;
    const departmentId =  await db.position.findOne({where: {id: positionId}, attributes: ['departmentId']})
    db.person.update({
        positionId,
        departmentId: departmentId.departmentId,
    }, {where: {id}})
    res.status(200).send('Update completed')
})


const storage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, '../frontend/src/upload/')
    },
    filename: (req, res, next) => {
        next(null, Date.now() + '.png')
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        name, surname, email, gender, dateOfBirth, martialStatus, nationality, IDNumber, contactNumber, address,
        employeeCode, workingStartDate, probationEndDate, jobTitle, department, employeeType, employeeStatus, manager,
        resignationDate, resignationReason, taxID, accountNO, accountName, compensationType, salary
    } = req.body
    
    await db.person.update({ 
        name, surname, email, gender, dateOfBirth, martialStatus, nationality, IDNumber, contactNumber, address,
        employeeCode, workingStartDate, probationEndDate,
        positionId: jobTitle,
        departmentId: department,
        employeeType,
        employeeStatus,
        manager,
        resignationDate,
        resignationReason,
        taxID,
        accountNO,
        accountName,
        compensationType,
        salary,
     }, { where: { id: id } })
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(400).send(err)
        })
})

router.put('/withPicture/:id', multer({storage,}).single('file'), (req, res) => {
    const picture = req.file.filename
    const id = req.params.id;
    const {
        name, surname, email, gender, dateOfBirth, martialStatus, nationality, IDNumber, contactNumber, address,
        employeeCode, workingStartDate, probationEndDate, jobTitle, department, employeeType, employeeStatus, manager,
        resignationDate, resignationReason, taxID, accountNO, accountName, compensationType, salary
    } = req.body
    
    db.person.update({ 
        name, surname, email, gender, dateOfBirth, martialStatus, nationality, IDNumber, contactNumber, address,
        employeeCode, workingStartDate, probationEndDate,
        positionId: jobTitle,
        departmentId: department,
        employeeType,
        employeeStatus,
        manager,
        resignationDate,
        resignationReason,
        taxID,
        accountNO,
        accountName,
        compensationType,
        salary,
        picture
     }, { where: { id: id } })
        .then(result => {
            res.status(200).send(req.file)
        }).catch(err => {
            res.status(400).send(err)
        })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.person.destroy({ where: { id: id } })
    .then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err)
    })

})

module.exports = router;