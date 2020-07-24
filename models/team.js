const Sequelize = require('sequelize');

module.exports = class Team extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      recruiting_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      resume_link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sheets_link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      introduction: {
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
      tableName: 'teams'
    })
  }
}