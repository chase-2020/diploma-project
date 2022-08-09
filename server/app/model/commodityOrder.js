/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('commodityorder', {
    orderNumber: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sponsor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0'
    },
    commodityType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'AUTO_INCREMENT'
    },
    user: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    commoditys: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    placeAnOrder: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    orderComplete: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    orderType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    img: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'commodityorder'
  });

  Model.associate = function() {

  }

  return Model;
};
