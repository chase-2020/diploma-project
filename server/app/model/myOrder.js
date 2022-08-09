/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('myOrder', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    fieldNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    usageTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    discount: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    actualPayment: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    single: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'myOrder'
  });

  Model.associate = function() {

  }

  return Model;
};
