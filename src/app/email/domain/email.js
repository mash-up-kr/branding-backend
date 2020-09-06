const Sequelize = require('sequelize');
const SEND_STATUS = require('./send_status.js');

class Email extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      send_status: {
        type: Sequelize.ENUM(SEND_STATUS.SUCCESS, SEND_STATUS.FAIL),
        allowNull: false,
      },
      team_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      applicant_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      send_count: {
        type: Sequelize.INTEGER,
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
      tableName: 'emails'
    })
  }
}

module.exports = Email;
