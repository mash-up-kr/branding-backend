
const {Sequelize, Op, QueryTypes} = require('sequelize');
const FAQ = require('../../app/recruitment/domain/faq.js');
const Team = require('../../app/recruitment/domain/team.js');
const Recruiting = require('../../app/recruitment/domain/recruiting.js');
const User = require('../../app/user/domain/user.js');
const Question = require('../../app/applicant/domain/question.js');
const Applicant = require('../../app/applicant/domain/applicant.js');
const Answer = require('../../app/applicant/domain/answer.js');
const MailLog = require('../../app/mail/domain/mail_log.js');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../../../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;

db.User = User;
db.Recruiting = Recruiting;
db.FAQ = FAQ;
db.Team = Team;
db.Question = Question;
db.Applicant = Applicant;
db.Answer = Answer;
db.MailLog = MailLog;

User.init(sequelize);
Recruiting.init(sequelize);
FAQ.init(sequelize);
Team.init(sequelize);
Question.init(sequelize);
Applicant.init(sequelize);
Answer.init(sequelize);
MailLog.init(sequelize);

module.exports = db;
