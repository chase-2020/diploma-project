/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('newstudent', {
    sid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    documentType: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    ID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    age: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    birthday: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    createdAt: {
      type: "LONGBLOB",
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sex: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    major: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'newstudent'
  });

  Model.associate = function() {

  }

  return Model;
};
