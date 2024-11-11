import express from 'express';
import { CuestionariosModel } from '../models/UsersModels.js';

const router = express.Router();

// Ruta para obtener todos los cuestionarios
router.get('/', async (req, res) => {
  try {
    const cuestionarios = await CuestionariosModel.find();
    res.json(cuestionarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo cuestionario
router.post('/', async (req, res) => {
  const cuestionario = new CuestionariosModel(req.body);
  try {
    const nuevoCuestionario = await cuestionario.save();
    res.status(201).json(nuevoCuestionario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
