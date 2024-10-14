// Importación de módulos necesarios
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// Importar las rutas
import usuariosRoutes from "./routes/usuarios.js";
import cuestionariosRoutes from "./routes/cuestionarios.js";
import preguntasRoutes from "./routes/preguntas.js";
import respuestasRoutes from "./routes/respuestas.js";

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
const mongoURI = "mongodb://localhost:27017/formulario";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("API funcionando correctamente");
});

// Integrar las rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/cuestionarios", cuestionariosRoutes);
app.use("/api/preguntas", preguntasRoutes);
app.use("/api/respuestas", respuestasRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en el servidor.");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
