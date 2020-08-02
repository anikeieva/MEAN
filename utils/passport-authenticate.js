module.exports = passport => {
    return passport.authenticate('jwt', { session: false });
};
