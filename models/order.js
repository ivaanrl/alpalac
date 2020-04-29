module.exports = function (sequelize, DataTypes) {
  return sequelize.define("order", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      field: "id",
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};
