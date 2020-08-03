
const path = require('path');
const Sequelize = require('sequelize');
const QnA = require('../../app/recruitment/qna');
const Team = require('../../app/team/team');
const Recruiting = require('../../app/recruitment/recruiting');
const User = require('../../app/user/domain/user');
const Question = require('../../app/applicant/domain/question');
const Applicant = require('../../app/applicant/domain/applicant');
const Answer = require('../../app/applicant/domain/answer');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../../../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Recruiting = Recruiting;
db.QnA = QnA;
db.Team = Team;
db.Question = Question;
db.Applicant = Applicant;
db.Answer = Answer;

User.init(sequelize);
Recruiting.init(sequelize);
QnA.init(sequelize);
Team.init(sequelize);
Question.init(sequelize);
Applicant.init(sequelize);
Answer.init(sequelize);

module.exports = db;


