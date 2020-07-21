const Sequelize = require('sequelize');
const APPLICATION_STATUS = require("./applicationStatus");

module.exports = class Applicant extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      teams_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      application_status: {
        type: Sequelize.ENUM(APPLICATION_STATUS.APPLICATION_COMPLETION, APPLICATION_STATUS.DOCUMENT_FAILL,
          APPLICATION_STATUS.DOCUMENT_PASS, APPLICATION_STATUS.DOCUMENT_FAILL_NOTIFICATION,
          APPLICATION_STATUS.DOCUMENT_PASS_NOTIFICATION, APPLICATION_STATUS.FINAL_INTERVIEW,
          APPLICATION_STATUS.FINAL_PASS, APPLICATION_STATUS.FINAL_FAIL,
          APPLICATION_STATUS.FINAL_PASS_NOTIFICATION, APPLICATION_STATUS.FINAL_FAIL_NOTIFICATION),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      application_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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
      tableName: 'applicants'
    })
  }
}