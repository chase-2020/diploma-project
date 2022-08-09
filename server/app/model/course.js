/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('course', {
    courseId: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    coachId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    coachName: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: ''
    },
    coachPhone: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: ''
    },
    sponsor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    courseType: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
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
    appointmenTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    serverPlace: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    studentAge: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    numberOfCourse: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ctid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    courseMaxNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ReservedNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    courseMinNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    puliceClass: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    courseIntroduction: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: ''
    },
    courseNotice: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
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
    tableName: 'course'
  });

  Model.associate = function() {

  }

  return Model;
};
