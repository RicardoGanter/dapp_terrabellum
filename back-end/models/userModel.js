import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel= db.define('usuarios',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);
const MoneyblueModel= db.define('moneyblue',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  money:{ type:DataTypes.INTEGER,
          allowNull: false,
        },
  puntos:{ type:DataTypes.INTEGER,
           allowNull: false,
         }
})
export default UsuarioModel;