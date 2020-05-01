module.exports = function (sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partitionable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fullWeightPrice: {
      type: DataTypes.FLOAT,
    },
  });
};
