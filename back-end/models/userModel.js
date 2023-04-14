import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel= db.define('usuarios',{
    nombre:{ type:DataTypes.STRING},
    email:{ type:DataTypes.STRING},
    contraseña:{type:DataTypes.STRING}
})

export default UsuarioModel;