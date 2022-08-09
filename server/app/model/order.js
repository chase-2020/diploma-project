/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order', {
    did: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '0'
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    courtType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0'
    },
    courtName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0'
    },
    mbName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: '0'
    },
    mbAddr: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: '0'
    },
    money: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    state: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: '0'
    },
    orderNum: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cdid: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '0'
    },
    yytime: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    fuwu: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0'
    },
    sitePrice: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    packageType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    paymentAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    dtype: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: '0'
    },
    message: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    coachName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    courseName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: ''
    },
    courseId: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    coursePrice: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    ctid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    courseAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    courseChangDi: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    coachPhone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    userNumber: {
      type: DataTypes.INTEGER(10),
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
    courseNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    studentAge: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'order'
  });

  Model.associate = function() {

  }

  return Model;
};
