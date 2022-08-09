/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('record', {
    rid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    integral: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    channel: {
      type: DataTypes.STRING(255),
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
    tableName: 'record'
  });

  Model.associate = function() {

  }

  return Model;
};
