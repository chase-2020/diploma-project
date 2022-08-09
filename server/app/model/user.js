/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    age: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    hight: {
      type: "DOUBLE(10,0)",
      allowNull: true
    },
    weight: {
      type: "DOUBLE(6,0)",
      allowNull: true
    },
    senFen: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    wxOpenId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: ''
    },
    qq: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    keCheng: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    passWord: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    verificationCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    payWord: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    vipcardid: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    balance: {
      type: DataTypes.INTEGER(20),
      allowNull: true,
      defaultValue: '0'
    },
    integral: {
      type: DataTypes.INTEGER(50),
      allowNull: true,
      defaultValue: '0'
    },
    record: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '1'
    },
    birthday: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    motto: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    hobby: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    registerTime: {
      type: DataTypes.BIGINT,
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
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};
