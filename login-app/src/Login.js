import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Asegúrate de que el archivo de CSS esté siendo importado
 // Asegúrate de importar el archivo de estilos

const Login = () => {
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
      // Enviar la solicitud POST al backend para hacer login
      const response = await axios.post('http://localhost:3000/api/usuarios/login', {
        correo: email,
        contraseña: password,
      });

      if (response.status === 200) {
        alert('Login exitoso');
        // Aquí puedes redirigir al usuario a otro componente, por ejemplo:
        // history.push('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Error en el inicio de sesión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default Login;
