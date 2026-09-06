import { useState, useEffect } from 'react';
import TimerForm from './components/TimerForm';
import type { Timer } from './types/timer';
import './App.css'

  const initialTimers: Timer[] = [
    {
      id: crypto.randomUUID(),
      name: 'training1',
      randomMin: 1,
      randomMan: 3,
      trainingTime: 4,
      interval: 5,
      rounds: 6,
    },
    {
      id: crypto.randomUUID(),
      name: 'training2',
      randomMin: 1,
      randomMan: 3,
      trainingTime: 4,
      interval: 5,
      rounds: 6,
    }
  ];

function App() {
  

  return (
    <main className="timer-app">
      <h1>ReactionTimer</h1>
      <p>好機を捉える初動を磨く</p>
      <TimerForm />

    </main>
  ); 
}

export default App
