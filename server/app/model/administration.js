/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('administration', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tName: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: ''
    },
    sex: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    joinTime: {
      type: DataTypes.BIGINT,
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
    vipType: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER(30),
      allowNull: true
    },
    integral: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    balance: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    birthday: {
      type: DataTypes.BIGINT,
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
    tableName: 'administration'
  });

  Model.associate = function() {

  }

  return Model;
};
