/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('myclass', {
    kid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    courseName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    coursetype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sponsor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachname: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    coachphone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    coachId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    appointmenTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    serverPlace: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    courseIntroduction: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    courseNotice: {
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
    },
    className: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    venueName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    classTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    teacher: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    trainTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    numberOfCourses: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'myclass'
  });

  Model.associate = function() {

  }

  return Model;
};
