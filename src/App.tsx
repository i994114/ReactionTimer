import { useState } from 'react';
import TimerForm from './components/TimerForm';
import TimerList from './components/TimerList';
//import type { Timer } from './types/timer';
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
      <h1>ReactionTimer</h1>
      <p>好機を捉える初動を磨く</p>

      <TimerForm onAdd={addTimer} />
      <TimerList timers={timers} />

    </main>
  ); 
}

export default App
