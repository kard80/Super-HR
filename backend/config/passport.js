const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const db = require('../models')

const option = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'myPersonalProject'
}

const jwt = new JwtStrategy(option, async (payload, done) => {
     const user = await db.user.findOne({where: {id: payload.id}})
     if(user) {
         return done(null, user)
     } else {
         return done(null, false)
     }

})

passport.use('jwt', jwt)