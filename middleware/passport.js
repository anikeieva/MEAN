const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys');
const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtCode
};

module.exports = passport => {
    passport.use(
      new JwtStrategy(options, newJwtStrategy)
    );
};

async function newJwtStrategy(payload, done) {
    try {
        const user = User.findById(payload.id).select('login id');

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
    }
}
