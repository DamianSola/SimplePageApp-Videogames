const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define( "genres" ,{
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    })
}