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
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      application_status: {
        type: Sequelize.ENUM(...Object.keys(APPLICATION_STATUS)),
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
    this.application_status = applicationStatus;
  }

  nextStatus() {
    this.application_status = APPLICATION_STATUS.next(this.application_status);
  }
}

module.exports = Applicant;
