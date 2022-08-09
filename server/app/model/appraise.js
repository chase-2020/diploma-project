/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('appraise', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    userPhoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachName: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    courseName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    coachGrade: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    courseGrade: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    coachAppContent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseAppContent: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    stateCourse: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'appraise'
  });

  Model.associate = function() {

  }

  return Model;
};
