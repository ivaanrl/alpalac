module.exports = async (req, res, next) => {
  console.log(req.user);

  try {
    const user = await global.db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user) {
      console.log("next");
      next();
    }
  } catch (error) {
    return res.status(401);
  }
};
