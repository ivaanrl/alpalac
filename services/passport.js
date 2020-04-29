const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
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
          });
        }
        cb(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
