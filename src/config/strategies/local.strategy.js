const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            // this is where we'll hit the db and verifiy user
            // but for now:
            const user = {
                // what this will do, log-in w/ username password, creates user
                username, password
            }
            done(null, user);

        }
     ));

}