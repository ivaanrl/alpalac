const passport = require('passport');
require('../services/passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const user = {
        id: req.user.dataValues.id,
        firstName: req.user.dataValues.firstName,
        lastName: req.user.dataValues.lastName,
      };
      res.redirect('http://localhost:3000/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
