const Sequelize = require('sequelize');

class Recruiting extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      main_banner: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
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
      tableName: 'recruiting',
    });
  }

  changeInfo(mainBanner, title, introduction, recruitmentStart, recruitmentEnd, documentAcceptanceStart, documentAcceptanceEnd, 
            interviewStart, interviewEnd, finalAcceptanceStart, finalAcceptanceEnd) {
    this.main_banner = mainBanner;
    this.title = title;
    this.introduction = introduction;
    this.recruitment_start_period = recruitmentStart;
    this.recruitment_end_period = recruitmentEnd;
    this.document_acceptance_start_period = documentAcceptanceStart;
    this.document_acceptance_end_period = documentAcceptanceEnd;
    this.interview_start_period = interviewStart;    
    this.interview_end_period = interviewEnd;
    this.final_acceptance_start_period = finalAcceptanceStart;
    this.final_acceptance_end_period = finalAcceptanceEnd;
  }
}

module.exports = Recruiting;
