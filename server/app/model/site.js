/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('site', {
    site: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courtid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    merchant: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    siteType: {
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
    sitePhoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bkPlan: {
      type: DataTypes.TEXT,
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
    tableName: 'site'
  });

  Model.associate = function() {

  }

  return Model;
};
