/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('yueke', {
    yId: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    keCheng: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    keQantity: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    keuDays: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    keDuration: {
      type: DataTypes.INTEGER(20),
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
    tableName: 'yueke'
  });

  Model.associate = function() {

  }

  return Model;
};
