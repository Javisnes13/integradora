import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Importar las rutas
import usuariosRoutes from './routes/usuarios.js';
import cuestionariosRoutes from './routes/cuestionarios.js';
import preguntasRoutes from './routes/preguntas.js';
import respuestasRoutes from './routes/respuestas.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/formulario', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middleware
app.use(cors()); // Habilitar CORS para peticiones entre dominios
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes en formato JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('API funcionando correctamente');
});

// Usar las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cuestionarios', cuestionariosRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/respuestas', respuestasRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
