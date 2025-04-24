import React, { useState, useEffect } from 'react';
import './App.css';

const ejercicios = {
  principiante: {
    musculo: [
      { nombre: 'Press de banca', imagen: 'https://via.placeholder.com/300x200?text=Press+Banca', sets: 3, reps: 10 },
      { nombre: 'Sentadillas', imagen: 'https://via.placeholder.com/300x200?text=Sentadillas', sets: 3, reps: 10 },
      { nombre: 'Fondos en paralelas', imagen: 'https://via.placeholder.com/300x200?text=Fondos+Paralelas', sets: 3, reps: 12 },
    ],
    definicion: [
      { nombre: 'Flexiones', imagen: 'https://via.placeholder.com/300x200?text=Flexiones', sets: 3, reps: 15 },
      { nombre: 'Plancha', imagen: 'https://via.placeholder.com/300x200?text=Plancha', sets: 3, reps: 30 },
    ],
  },
  intermedio: {
    musculo: [
      { nombre: 'Peso muerto', imagen: 'https://via.placeholder.com/300x200?text=Peso+Muerto', sets: 4, reps: 8 },
      { nombre: 'Press militar', imagen: 'https://via.placeholder.com/300x200?text=Press+Militar', sets: 4, reps: 8 },
      { nombre: 'Remo con barra', imagen: 'https://via.placeholder.com/300x200?text=Remo+Barra', sets: 4, reps: 8 },
    ],
    definicion: [
      { nombre: 'Burpees', imagen: 'https://via.placeholder.com/300x200?text=Burpees', sets: 4, reps: 12 },
      { nombre: 'Ab twist', imagen: 'https://via.placeholder.com/300x200?text=Ab+Twist', sets: 4, reps: 20 },
    ],
  },
  avanzado: {
    musculo: [
      { nombre: 'Sentadillas con barra', imagen: 'https://via.placeholder.com/300x200?text=Sentadilla+con+Barra', sets: 5, reps: 6 },
      { nombre: 'Pull-ups', imagen: 'https://via.placeholder.com/300x200?text=Pull+Ups', sets: 5, reps: 6 },
      { nombre: 'Hip thrust', imagen: 'https://via.placeholder.com/300x200?text=Hip+Thrust', sets: 5, reps: 8 },
    ],
    definicion: [
      { nombre: 'Sprints', imagen: 'https://via.placeholder.com/300x200?text=Sprints', sets: 5, reps: 30 },
      { nombre: 'Mountain climbers', imagen: 'https://via.placeholder.com/300x200?text=Mountain+Climbers', sets: 5, reps: 15 },
    ],
  },
};

function App() {
  const [nivel, setNivel] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [dias, setDias] = useState(3);

  const [rutina, setRutina] = useState(() => {
    const guardada = localStorage.getItem('rutina');
    return guardada ? JSON.parse(guardada) : [];
  });

  const generarRutina = (e) => {
    e.preventDefault();
    if (!nivel || !objetivo || dias < 1) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ejerciciosDisponibles = ejercicios[nivel][objetivo];
    const rutinaGenerada = [];

    for (let i = 0; i < dias; i++) {
      const aleatorio = Math.floor(Math.random() * ejerciciosDisponibles.length);
      rutinaGenerada.push(ejerciciosDisponibles[aleatorio]);
    }

    setRutina(rutinaGenerada);
    localStorage.setItem('rutina', JSON.stringify(rutinaGenerada));
  };

  const borrarRutina = () => {
    setRutina([]);
    localStorage.removeItem('rutina');
  };

  return (
    <div className="App">
      <h1>Generador de Rutinas de Gimnasio</h1>

      <form onSubmit={generarRutina}>
        <label>Nivel de experiencia:</label>
        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
          <option value="">Selecciona tu nivel</option>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        <label>Objetivo:</label>
        <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}>
          <option value="">Selecciona tu objetivo</option>
          <option value="musculo">Ganar músculo</option>
          <option value="definicion">Perder grasa</option>
        </select>

        <label>Días de entrenamiento por semana:</label>
        <input
          type="number"
          min="1"
          max="7"
          value={dias}
          onChange={(e) => setDias(Number(e.target.value))}
        />

        <button type="submit">Generar rutina</button>
      </form>

      {rutina.length > 0 && (
        <div>
          <h2>Tu rutina:</h2>
          {rutina.map((ej, index) => (
            <div className="rutina" key={index}>
              <h3>{ej.nombre}</h3>
              <img src={ej.imagen} alt={ej.nombre} />
              <p><strong>Series:</strong> {ej.sets}</p>
              <p><strong>Repeticiones:</strong> {ej.reps}</p>
            </div>
          ))}

          <button onClick={borrarRutina}>Borrar rutina guardada</button>
        </div>
      )}
    </div>
  );
}

export default App;
