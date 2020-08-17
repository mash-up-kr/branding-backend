const Sequelize = require('sequelize');
const ROLE = require('../../../common/model/role.js');
const passwordEncryption = require('../../../util/password_encryption.js');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id : {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(ROLE.COMMON, ROLE.ADMIN),
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
      tableName: 'users'
    })
  }

  async equalsPassword(inputPassword) {
    return await passwordEncryption.equalsEncryption(this.password, inputPassword);
  }
}

module.exports = new User();
