if (!global.hasOwnProperty('db')) {
  const Sequelize = require('sequelize');
  sequelize = null;

  console.log(process.env.DATABASE_URL);
  if (process.env.DATABASE_URL) {
    try {
      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false, //true
        dialectOptions: {
          ssl: true,
        },
      });
    } catch (error) {
      console.log("can't connect to DB");
    }
  } else {
    sequelize = new Sequelize({
      database: 'Alpalac',
      username: 'ivanrl',
      password: '73442332',
      dialect: 'postgres',
      logging: true,
    });
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user'),
    Order: sequelize.import(__dirname + '/order'),
    Item: sequelize.import(__dirname + '/item'),
  };

  global.db.User.hasMany(global.db.Order, { foreignKey: 'userId' });
  global.db.Order.belongsTo(global.db.User, { foreignKey: 'userId' });
}

module.exports = global.db;
