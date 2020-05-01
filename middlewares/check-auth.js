module.exports = async (req, res, next) => {
  console.log(req.user);

  try {
    const user = await global.db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user) {
      next();
    }
  } catch (error) {
    return res.status(401);
  }
};
