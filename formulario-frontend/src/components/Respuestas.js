import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Respuestas = () => {
  const [respuestas, setRespuestas] = useState([]);
  const { preguntaId } = useParams(); // Obtener el ID de la pregunta desde la URL

  useEffect(() => {
    // Hacer la solicitud para obtener respuestas para una pregunta específica
    axios.get(`http://localhost:3000/api/respuestas?preguntaId=${preguntaId}`)
      .then((response) => {
        setRespuestas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener respuestas:', error);
      });
  }, [preguntaId]);

  return (
    <div>
      <h2>Respuestas</h2>
      <ul>
        {respuestas.map((respuesta) => (
          <li key={respuesta._id}>
            {respuesta.respuesta} - {new Date(respuesta.fecha_creacion).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Respuestas;
