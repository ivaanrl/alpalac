const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.serializeUser((user, cb) => {
  console.log('Serialize:', user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const foundUser = await global.db.User.findOne({
      where: {
        id,
      },
    });
    const user = {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      address: foundUser.address,
      phoneNumber: foundUser.phoneNumber,
      role: foundUser.role,
    };
    console.log('deserialize', user);
    cb(null, user);
  } catch (error) {
    cb(null, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await global.db.User.findOne({
          where: {
            id: profile.id,
          },
        });
        if (!user) {
          user = await global.db.User.create({
            id: profile.id,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            role: 'user',
          });
        }
        cb(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
