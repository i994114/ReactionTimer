import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
//import type { Timer } from './types/timer';

import Home from './components/Home';
import TimerForm from './components/TimerForm';
import TimerList from './components/TimerList';

import './App.css'

function App() {
  
  const [timers, setTimers] = useState([
    {
      id: crypto.randomUUID(),
      name: 'training1',
      randomMin: 1,
      randomMax: 3,
      trainingTime: 4,
      interval: 5,
      rounds: 6,
    },
    {
      id: crypto.randomUUID(),
      name: 'training2',
      randomMin: 1,
      randomMax: 3,
      trainingTime: 4,
      interval: 5,
      rounds: 6,
    }

  ]);

  function addTimer(text) {
    const newTimer = {
      id: crypto.randomUUID(),
      name: text,
      randomMin: 1,
      randomMax: 3,
      trainingTime: 4,
      interval: 5,
      rounds: 6,
    };

    setTimers((currentTimers) => [...currentTimers, newTimer]);
  }

  return (
    <main className="timer-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<TimerForm />}  />
        {/* <Route path="/training/:id" element={<Training />}  /> */}
      </Routes>
    </main>
  ); 
}

export default App
