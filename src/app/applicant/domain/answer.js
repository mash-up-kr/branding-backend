const Sequelize = require('sequelize');

class Answer extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      questions_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      applicants_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      create_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      update_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      tableName: 'answers'
    })
  }
}

module.exports = new Answer();
