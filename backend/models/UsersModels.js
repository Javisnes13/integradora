// models/PreguntaModel.js
import mongoose from 'mongoose';

const preguntaSchema = new mongoose.Schema({
  cuestionarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuestionario' },
  pregunta: { type: String, required: true },
});

const PreguntasModel = mongoose.model('Pregunta', preguntaSchema);
export { PreguntasModel };
