const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql12771949', 'sql12771949', 'Zssh4cn4uS', {
  host: 'sql12.freesqldatabase.com',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;