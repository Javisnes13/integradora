// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de que los estilos se mantengan.

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Maneja el cambio en el campo de email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Maneja el cambio en el campo de contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Función para manejar el submit del formulario
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post('http://localhost:3000/api/usuarios', {
        correo: email,
        contraseña: password, // Asumiendo que envías contraseña para validación
      });

      if (response.status === 200) {
        alert('Login exitoso');
        // Aquí podrías redirigir al usuario a otra página
        // Redirigir al Dashboard, por ejemplo:
        // history.push('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Error en el inicio de sesión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Introduce tu correo"
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Introduce tu contraseña"
              required
            />
          </div>

          {errorMessage && <div className="error">{errorMessage}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
