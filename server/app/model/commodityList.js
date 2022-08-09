/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('commoditylist', {
    commodity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    classification: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    supplier: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    goodsName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'commoditylist'
  });

  Model.associate = function() {

  }

  return Model;
};
