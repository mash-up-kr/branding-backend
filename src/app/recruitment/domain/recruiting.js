const Sequelize = require('sequelize');

 class Recruiting extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      main_banner: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      introduction: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      recruitment_start_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      recruitment_end_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      document_acceptance_start_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      document_acceptance_end_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      interview_start_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      interview_end_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      final_acceptance_start_period: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      final_acceptance_end_period: {
        type: Sequelize.DATE,
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
      tableName: 'recruiting'
    })
  }
}

module.exports = new Recruiting();
