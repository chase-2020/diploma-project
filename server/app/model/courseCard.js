/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('coursecard', {
    vipIp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vipNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    endTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    vipType: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    vipIntegral: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vipStae: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vipQian: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vipMoney: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vipImg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    vipDays: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vipCiShu: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'coursecard'
  });

  Model.associate = function() {

  }

  return Model;
};
