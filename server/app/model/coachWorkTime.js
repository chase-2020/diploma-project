/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('coachworktime', {
    workId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    coachId: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'coachworktime'
  });

  Model.associate = function() {

  }

  return Model;
};
