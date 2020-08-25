const Sequelize = require('sequelize');

const APPLICATION_STATUS = require('./application_status.js');

class Applicant extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teams_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      application_status: {
        type: Sequelize.ENUM(...APPLICATION_STATUS),
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
      tableName: 'applicants',
    });
  }

  async changeStatus(applicationStatus) {
    this.APPLICATION_STATUS = applicationStatus;
  }
}

module.exports = Applicant;
