const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../model/userModel');

passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      const user = await userModel.getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isValidPassword = await userModel.validatePassword(user, password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
