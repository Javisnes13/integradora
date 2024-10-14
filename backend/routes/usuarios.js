import express from "express";
import { UsuariosModel } from "../models/UsersModels.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await UsuariosModel.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo usuario
router.post("/", async (req, res) => {
  const usuario = new UsuariosModel(req.body);
  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
