const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

const department = require('./routes/department')
const leave = require('./routes/leave')
const person = require('./routes/person')
const position = require('./routes/position')
const timeAttendance = require('./routes/timeAttendance')
const user = require('./routes/user')

// const auth = require('./config/authorize.js')
const passport = require('passport');
require('./config/passport/passport');
const authentication = passport.authenticate('jwt', {session: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/department', department)
app.use('/leave', leave)
app.use('/person', person)
app.use('/position', position)
app.use('/timeAttendance', authentication, timeAttendance)
app.use('/user', user)

db.sequelize.sync({ force: false })
    .then(() => {
        app.listen(8000, () => {
            console.log('Server is running')
        })
    })