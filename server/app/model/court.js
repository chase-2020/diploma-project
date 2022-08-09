/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('court', {
    ctid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    retes: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    coverPhoto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sdInfo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bcType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    siteAddress: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    planByTime: {
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
    tableName: 'court'
  });

  Model.associate = function() {

  }

  return Model;
};
