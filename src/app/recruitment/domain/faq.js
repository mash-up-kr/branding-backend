const Sequelize = require('sequelize');

class FAQ extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recruitment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      answer: {
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
      tableName: 'faq'
    })
  }
}

module.exports = FAQ;
