/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('venueclass', {
    vcid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    className: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sponsor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    venueName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    site: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    classTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    contacts: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    teacher: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    studentAge: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    trainTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alreadyPeople: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    numberOfCourses: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'venueclass'
  });

  Model.associate = function() {

  }

  return Model;
};
