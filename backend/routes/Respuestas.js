import express from 'express';
import { RespuestasModel } from '../models/UsersModels.js';

const router = express.Router();

// Ruta para obtener todas las respuestas
router.get('/', async (req, res) => {
  try {
    const respuestas = await RespuestasModel.find();
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva respuesta
router.post('/', async (req, res) => {
  const respuesta = new RespuestasModel(req.body);
  try {
    const nuevaRespuesta = await respuesta.save();
    res.status(201).json(nuevaRespuesta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
