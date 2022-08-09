/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('member', {
    vipId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vipNumber: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    vipSex: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    vipName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    endTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    vipType: {
      type: DataTypes.INTEGER(50),
      allowNull: true
    },
    totalSpend: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    spendItem: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    vipIntegral: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cardsRemain: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vipPhone: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: ''
    },
    vipState: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    vipBirthday: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    vipQian: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    vipMoney: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    vipImg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vipDays: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    vipyueke: {
      type: DataTypes.INTEGER(10),
      allowNull: true
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
    tableName: 'member'
  });

  Model.associate = function() {

  }

  return Model;
};
