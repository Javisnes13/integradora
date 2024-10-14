import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
  id_usuario: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  carrera: { type: String, required: true },
  año_egreso: { type: Number, required: true },
});

export const UsuariosModel = model("Usuario", UsuariosSchema);

const CuestionariosSchema = new Schema({
  id_cuestionario: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fecha_creacion: { type: Date, required: true },
});

export const CuestionariosModel = model("Cuestionario", CuestionariosSchema);

const PreguntasSchema = new Schema({
  id_pregunta: { type: Number, required: true, unique: true },
  id_cuestionario: { type: Number, required: true, ref: "Cuestionario" },
  texto_pregunta: { type: String, required: true },
  valor_min: { type: Number },
  valor_max: { type: Number },
});

export const PreguntasModel = model("Pregunta", PreguntasSchema);

const RespuestasSchema = new Schema({
  id_respuesta: { type: Number, required: true, unique: true },
  id_usuario: { type: Number, required: true, ref: "Usuario" },
  id_pregunta: { type: Number, required: true, ref: "Pregunta" },
  respuesta: { type: String },
  fecha_respuesta: { type: Date, required: true },
  valor_respuesta: { type: Number },
});

export const RespuestasModel = model("Respuestas", RespuestasSchema);
