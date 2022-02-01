'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   this.belongsTo(models.User, {
    //     as: 'subscribed',
    //     foreignKey: 'subscribedId'
    //   });
    //   this.belongsTo(models.User, {
    //     as: 'subscriber',
    //     foreignKey: 'subscriberId'
    //   })
     }
  };
  Favorite.init({
    // subscriber: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // subscribed:{
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  // Friend.belongsTo(User);
  return Favorite;
};