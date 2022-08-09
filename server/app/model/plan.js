/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('plan', {
    planid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    siteid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    planNum: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    planByTime: {
      type: DataTypes.TEXT,
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
    tableName: 'plan'
  });

  Model.associate = function() {

  }

  return Model;
};
