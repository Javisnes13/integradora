import express from "express";
import { PreguntasModel } from "../models/UsersModels.js"; // Asegúrate de crear el modelo

const router = express.Router();

// Ruta para obtener todas las preguntas
router.get("/", async (req, res) => {
  try {
    const preguntas = await PreguntasModel.find();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva pregunta
router.post("/", async (req, res) => {
  const pregunta = new PreguntasModel(req.body);
  try {
    const nuevaPregunta = await pregunta.save();
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
