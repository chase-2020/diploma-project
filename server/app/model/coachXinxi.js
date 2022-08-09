/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('coachxinxi', {
    coachId: {
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
    photo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    registerTime: {
      type: DataTypes.BIGINT,
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
    coachTypoe: {
      type: DataTypes.STRING(18),
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
    mid: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'coachxinxi'
  });

  Model.associate = function() {

  }

  return Model;
};
