const path = require('path');
const User = require('./user');
const Recruiting = require('./recruiting');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Recruiting = Recruiting;

User.init(sequelize);
Recruiting.init(sequelize);

module.exports = db;


