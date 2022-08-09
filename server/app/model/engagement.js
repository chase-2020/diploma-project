/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('engagement', {
    uid: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    ordernumber: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projecttype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bookingTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numberoFentrants: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    totalAmountPaid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    paymentIP: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    paymentTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    amountPaid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    unpaidAmount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    aaSystem: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createAt: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updateAt: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'engagement'
  });

  Model.associate = function() {

  }

  return Model;
};
