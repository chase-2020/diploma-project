/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('coursemanage', {
    courseId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courseName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    coachName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    startTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    endTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    bookedPeople: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    appointPeople: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    courseType: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
    tableName: 'coursemanage'
  });

  Model.associate = function() {

  }

  return Model;
};
