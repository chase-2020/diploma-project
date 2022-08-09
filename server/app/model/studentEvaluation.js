/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('studentEvaluation', {
    评价编号: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'studentEvaluation'
  });

  Model.associate = function() {

  }

  return Model;
};
