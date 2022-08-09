/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('myintegral', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    totalIntegral: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    getIntegral: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'myintegral'
  });

  Model.associate = function() {

  }

  return Model;
};
