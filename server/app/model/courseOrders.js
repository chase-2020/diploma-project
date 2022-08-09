/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('courseOrders', {
    coId: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    coKe: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    oId: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    qId: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    uId: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    orderAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    payId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    payMoney: {
      type: DataTypes.INTEGER(30),
      allowNull: true
    },
    createAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updataAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'courseOrders'
  });

  Model.associate = function() {

  }

  return Model;
};
