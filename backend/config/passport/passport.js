const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../../models')

const option = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'myPersonalProject'
}

passport.use(
    new JWTStrategy(option, async(payload, done) => {
    const user = await db.user.findOne({where : {id: payload.id}})

    if(user) {
        done(null, user);
    }else {
        done(null, false);
    }
}))