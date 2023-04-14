import UsuarioModel from "../models/userModel.js";

export const createUsuario = async (req, res) => {
    try {
      await UsuarioModel.create(req.body);
      res.json({ message: "Registro completado" });
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