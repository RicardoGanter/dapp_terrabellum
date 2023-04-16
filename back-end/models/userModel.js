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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);
// const UsuarioModel= db.define('roles',{
//     rol:{ type:DataTypes.STRING},
// })
export default UsuarioModel;