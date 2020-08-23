const Sequelize = require('sequelize');
const SEND_STATUS = require('./send_status.js');
const APPLICATION_STATUS = require('../../../common/model/application_status.js');

class MailLog extends Sequelize.Model {
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
      application_status: {
        type: Sequelize.ENUM(APPLICATION_STATUS.APPLICATION_COMPLETION, APPLICATION_STATUS.DOCUMENT_FAILL,
          APPLICATION_STATUS.DOCUMENT_PASS, APPLICATION_STATUS.DOCUMENT_FAILL_NOTIFICATION,
          APPLICATION_STATUS.FINAL_INTERVIEW, APPLICATION_STATUS.FINAL_PASS, APPLICATION_STATUS.FINAL_FAIL,
          APPLICATION_STATUS.FINAL_PASS_NOTIFICATION, APPLICATION_STATUS.FINAL_FAIL_NOTIFICATION),
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
      tableName: 'mail_logs'
    })
  }
}

module.exports = MailLog;
