/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('event', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    holdingtime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    atime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    etime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ucall: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    organizer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    eventtype: {
      type: DataTypes.STRING(50),
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
    tableName: 'event'
  });

  Model.associate = function() {

  }

  return Model;
};
