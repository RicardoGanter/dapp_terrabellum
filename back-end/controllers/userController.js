import UsuarioModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { Sequelize } from "sequelize";
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
const secretKey = 'a';


//-------------------Register-POST---------------------------

export const createUsuario = async (req, res) => {
  try {
    const { nombre,email,contraseña } = req.body;
    // Verifica si el correo electrónico es válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Correo electrónico no válido" });
    }
    // Verifica si existe ya un nombre o email en la db
    const existingUser = await UsuarioModel.findOne({
      where: Sequelize.or(
        { nombre },
        { email }
      )
    });
    if (existingUser) {
      return res.status(400).json({ message: "Ya existe un usuario con ese correo electrónico o nombre" });
    }
    // encrypta la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 14);
    await UsuarioModel.create({ nombre, email, contraseña:hashedPassword });
    res.json({ message: "Registro completado" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

  //----------------Sigin-POST---------------------------------

  export const iniciarSesion = async (req, res) => {
    try {
      const { nombre, contraseña } = req.body;
      // Busca en la base de datos si hay un usuario con el nombredado
      const usuario = await UsuarioModel.findOne({ where: {nombre}});

      if (!usuario) {
        return res.status(400).json({ message: "Nombre o contraseña incorrecta" });
      }
      // Verifica si la contraseña coincide con la almacenada en la base de datos
     
      if (bcrypt.compare(contraseña, usuario.contraseña) === false) {
        console.log("lollololo",bcrypt.compareSync(contraseña, usuario.contraseña))
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
      // Genera un token de autenticación
      const token = await jwt.sign({ id: usuario.id }, secretKey);
      // Envia el token como respuesta
      res.json({ token });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  


  export const searchUsuario = async (req, res) => {
    try {
      const username = await UsuarioModel.findAll(req.body, {
        attributes: ['nombre'],
        where: { id: req.params.id },
      });
      res.json(username)
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  export const updateUsuario = async (req, res) => {
    try {
      await UsuarioModel.update(req.body, {
        where: { id: req.params.id },
      });
      res.json({
        message: "Registro completado",
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  export const deleteUsuario = async (req, res) => {
    try {
      UsuarioModel.destroy({
        where: { id:req.params.id },
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };