/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('config', {
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    channel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    integral: {
      type: DataTypes.INTEGER(255),
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
    tableName: 'config'
  });

  Model.associate = function() {

  }

  return Model;
};
