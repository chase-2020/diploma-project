/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('coach', {
    coachId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    coachType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachSex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachPhone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wxOpenId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emil: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachQq: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachSports: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coachIntro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coursePrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    courseName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseDuration: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    trainAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zhengShu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dengJi: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    hight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    personAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birthday: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    coachPhoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    passWord: {
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
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'coach'
  });

  Model.associate = function() {

  }

  return Model;
};
