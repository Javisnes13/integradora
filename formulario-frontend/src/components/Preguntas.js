import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Preguntas = () => {
  const { cuestionarioId } = useParams();  // Obtener el ID del cuestionario desde la URL
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [alerta, setAlerta] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Asegúrate de que el ID del cuestionario esté disponible
    if (!cuestionarioId) return;

    // Hacer la solicitud al backend para obtener las preguntas de este cuestionario
    axios.get(`http://localhost:3000/api/preguntas?cuestionarioId=${cuestionarioId}`)
      .then((response) => {
        setPreguntas(response.data);  // Guardar las preguntas recibidas
      })
      .catch((error) => {
        console.error('Error al obtener preguntas:', error);
      });
  }, [cuestionarioId]);  // Este efecto se ejecutará solo cuando el ID del cuestionario cambie

  const handleInputChange = (preguntaId, value) => {
    // Actualizar las respuestas a medida que el usuario las ingresa
    setRespuestas({
      ...respuestas,
      [preguntaId]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un array con las respuestas y sus preguntas correspondientes
    const respuestasArray = Object.keys(respuestas).map((preguntaId) => ({
      preguntaId,
      respuesta: respuestas[preguntaId],
    }));

    // Enviar las respuestas al backend
    axios.post('http://localhost:3000/api/respuestas', respuestasArray)
      .then((response) => {
        setAlerta({ type: 'success', message: 'Respuestas enviadas correctamente' });
        navigate('/');  // Redirigir al inicio después de enviar las respuestas
      })
      .catch((error) => {
        setAlerta({ type: 'error', message: 'Error al enviar respuestas' });
        console.error('Error al enviar respuestas:', error);
      });
  };

  return (
    <div className="preguntas-container">
      <h2>Responde el cuestionario</h2>

      {alerta && <div className={`alert ${alerta.type}`}>{alerta.message}</div>}

      <form onSubmit={handleSubmit}>
        {preguntas.length > 0 ? (
          preguntas.map((pregunta) => (
            <div key={pregunta._id} className="pregunta-item">
              <label>{pregunta.pregunta}</label>
              <input
                type="text"
                value={respuestas[pregunta._id] || ''}
                onChange={(e) => handleInputChange(pregunta._id, e.target.value)}
              />
            </div>
          ))
        ) : (
          <p>No hay preguntas disponibles para este cuestionario.</p>
        )}

        <button type="submit">Enviar Respuestas</button>
      </form>
    </div>
  );
};

export default Preguntas;
