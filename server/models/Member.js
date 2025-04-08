const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Member = sequelize.define('Member', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  // Add other fields from your schema
}, {
  tableName: 'members',
  timestamps: false
});

module.exports = Member;