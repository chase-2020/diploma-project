/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('orderrecord', {
    rid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderNum: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    did: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startIndex: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'orderrecord'
  });

  Model.associate = function() {

  }

  return Model;
};
