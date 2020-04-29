const passport = require("passport");
require("../services/passport");
const cors = require("cors");

module.exports = (app) => {
  //const addSocketIdToSession = (req, res, next) => {
  //  req.session.socketId = req.query.socketId;
  //  next();
  //};

  app.get(
    "/auth/google",
    //addSocketIdToSession,
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      const user = {
        id: req.user.dataValues.id,
        firstName: req.user.dataValues.firstName,
        lastName: req.user.dataValues.lastName,
      };
      req.session.user = req.user;
      //res.redirect("http://localhost:3000/category/quesos");
      res.redirect("/api/current_user");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
  });

  app.get("/api/current_user", (req, res) => {
    console.log(req.session);
    console.log(req.user);
    res.send(req.user);
  });
};
