const passport = require('passport');
const { ACCOUNT_TYPES } = require('~/constant');
const GoogleStrategy = require('passport-google-one-tap').GoogleOneTapStrategy;
const { getEnv } = require('~/helper');

// Login with google identify service
passport.use(
  new GoogleStrategy(
    {
      clientID: getEnv('GOOGLE_CLIENT_ID'),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
      verifyCsrfToken: false,
    },
    async (profile, done) => {
      try {
        if (!Boolean(profile)) {
          done(null, null);
          return;
        }

        const { displayName, emails, photos, id } = profile;
        done(null, {
          type: ACCOUNT_TYPES.GOOGLE,
          name: displayName,
          email: emails[0]?.value,
          avt: photos[0]?.value,
          id,
        });
      } catch (error) {
        done(error, null);
        return;
      }
    },
  ),
);
