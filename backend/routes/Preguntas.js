// routes/preguntas.js
import express from 'express';
import { PreguntasModel } from '../models/PreguntaModel.js'; // Importamos el modelo de preguntas

const router = express.Router();

// Ruta para obtener todas las preguntas de un cuestionario
router.get("/", async (req, res) => {
  const { cuestionarioId } = req.query;  // Obtener el ID del cuestionario desde la URL
  try {
    const preguntas = await PreguntasModel.find({ cuestionarioId: cuestionarioId });  // Filtrar preguntas por ID de cuestionario
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
