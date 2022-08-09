/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('eventactivities', {
    actId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    theme: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    poster: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    project: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    field: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    organizerphone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    organizer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sponsor: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quota: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    registration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    first: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    second: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    third: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    compete: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rttStartTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rttEndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
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
    tableName: 'eventactivities'
  });

  Model.associate = function() {

  }

  return Model;
};
