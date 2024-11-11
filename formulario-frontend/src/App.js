import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Usuarios from './components/Usuarios';
import Cuestionarios from './components/Cuestionarios';
import Preguntas from './components/Preguntas';
import Respuestas from './components/Respuestas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Formulario - Frontend</h1>
        <Routes>
          <Route path="/" element={<Cuestionarios />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/cuestionarios" element={<Cuestionarios />} />
          <Route path="/cuestionarios/:cuestionarioId" element={<Preguntas />} />
          <Route path="/respuestas/:preguntaId" element={<Respuestas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
