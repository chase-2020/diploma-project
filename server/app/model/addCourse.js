/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('addcourse', {
    addCourseId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courseName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseLevel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    courseIntro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseImg: {
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
    tableName: 'addcourse'
  });

  Model.associate = function() {

  }

  return Model;
};
