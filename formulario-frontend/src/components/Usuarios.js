import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>
            {usuario.nombre} - {usuario.correo} - {new Date(usuario.fecha_creacion).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
