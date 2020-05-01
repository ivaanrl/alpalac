module.exports = async (req, res, next) => {
  try {
    console.log('adasdsadsa');
    const user = await sequelize.query(`
        SELECT role FROM users where "id" = '${req.user.id}'
    `);
    if (user[0][0].role === 'admin') {
      next();
    }
  } catch (error) {
    console.log('bbbbbbbbbbbbbbbbb');
    console.log(error);
    return res.status(401);
  }
};
