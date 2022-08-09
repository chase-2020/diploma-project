/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sort', {
    9: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    10: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    11: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    12: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    13: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    14: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    15: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    16: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    17: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    18: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    19: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    20: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    21: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    22: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    23: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    24: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    site: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stadium: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    merchant: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    siteNum: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    time: {
      type: DataTypes.STRING(50),
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
    tableName: 'sort'
  });

  Model.associate = function() {

  }

  return Model;
};
