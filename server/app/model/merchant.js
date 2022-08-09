/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('merchant', {
    mid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    operatorAddress: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    priceRange: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    operatorProfile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pictureAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    ID: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    passWord: {
      type: DataTypes.STRING(32),
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
    },
    mNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'merchant'
  });

  Model.associate = function() {

  }

  return Model;
};
