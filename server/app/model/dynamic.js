/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('dynamic', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Photo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    username: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    releaseTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    context: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fabulous: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    evaluate: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    evalUsername: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    evalContext: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    evalTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    replyContext: {
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
    replyTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'dynamic'
  });

  Model.associate = function() {

  }

  return Model;
};
