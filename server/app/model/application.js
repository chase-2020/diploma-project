/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('application', {
    aId: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    realName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sex: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    idCard: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    certificate: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    introduce: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    weiXin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    qq: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    motion: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    work: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    keDate: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    tianDate: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    cardImg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cardMoney: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    cardQian: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    }
  }, {
    tableName: 'application'
  });

  Model.associate = function() {

  }

  return Model;
};
