import { useState } from 'react';
import TimerForm from './components/TimerForm';
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

  return (
    <main className="timer-app">
      <h1>ReactionTimer</h1>
      <p>好機を捉える初動を磨く</p>

      <ul>
        {timers.map((timer) => (
          <li key={timer.id}>
            {timer.name}
            {timer.randomMin}
            {timer.randomMax}
            
            
          </li>
        ))}
      </ul>
      <TimerForm />

    </main>
  ); 
}

export default App
