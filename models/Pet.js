var Sequelize = require('sequelize');
const defineModel = require('../db/defineModel');

const Pet = defineModel('pet', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN
})
module.exports = Pet;