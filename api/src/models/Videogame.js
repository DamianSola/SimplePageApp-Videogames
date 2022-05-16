const { DataTypes, TEXT, ENUM, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type:DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT
    },
    platforms:{
      type: DataTypes.ARRAY(STRING),  
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // genres:{
    //   type: DataTypes.STRING,  
    //   allowNull: false,
    // }
  });
};
