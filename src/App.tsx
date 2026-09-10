import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import TimerForm from './components/TimerForm';
import Training from './components/Training';
import './App.css'

function App() {
  
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<TimerForm />}  />
        <Route path="/edit/:id" element={<TimerForm />} />
        <Route path="/training/:id" element={<Training />}  />
      </Routes>
    </main>
  ); 
}

export default App
