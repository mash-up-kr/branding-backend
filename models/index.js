const path = require('path');
const Sequelize = require('sequelize');

const User = require('./user');
const Recruiting = require('./recruiting');
const QnA = require('./qna');
const Team = require('./team');
const Question = require('./question');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Recruiting = Recruiting;
db.QnA = QnA;
db.Team = Team;
db.Question = Question;

User.init(sequelize);
Recruiting.init(sequelize);
QnA.init(sequelize);
Team.init(sequelize);
Question.init(sequelize);

module.exports = db;


