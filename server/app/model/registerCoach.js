/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('registercoach', {
    coachId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    wxOpenId: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    personAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    birthday: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    hight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0.00'
    },
    dengJi: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    zhengShu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intro: {
      type: DataTypes.STRING(255),
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
    tableName: 'registercoach'
  });

  Model.associate = function() {

  }

  return Model;
};
