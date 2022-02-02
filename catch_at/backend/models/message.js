'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: 'sender',
        foreignKey: 'senderId'
      });
      this.belongsTo(models.User, {
        as: 'recipient',
        foreignKey: 'recipientId'
      })
     }
  };
  Message.init({
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};