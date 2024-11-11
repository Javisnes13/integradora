import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cuestionarios = () => {
  const [cuestionarios, setCuestionarios] = useState([]);

  useEffect(() => {
    // Obtener los cuestionarios desde el backend
    axios.get('http://localhost:3000/api/cuestionarios')
      .then(response => {
        setCuestionarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los cuestionarios:', error);
      });
  }, []);

  return (
    <div className="cuestionarios-container">
      <h2>Cuestionarios Disponibles</h2>
      <div className="cuestionarios-list">
        {cuestionarios.map((cuestionario) => (
          <div key={cuestionario._id} className="cuestionario-item">
            <Link to={`/cuestionarios/${cuestionario._id}`}>
              <h3>{cuestionario.titulo}</h3>
              <p>{cuestionario.descripcion}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuestionarios;
