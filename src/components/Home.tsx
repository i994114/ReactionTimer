import { useState } from 'react';
import type { Timer } from '../types/timer';
import { loadTimers } from '../utils/timerStorage';
import { deleteTimer } from '../utils/timerStorage';
import TimerList from './TimerList';
import { useNavigate } from 'react-router-dom';

const initialTimers: Timer[] = [
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

];

function Home() {
  const navigate = useNavigate();

  const [timers, setTimers] = useState<Timer[]>(
    () => loadTimers(initialTimers),
  );

  /* タイマー削除(単品) */
  function handleDelete(id: string) {
    const updatedTimers = deleteTimer(id);
    setTimers(updatedTimers);
  }

  return (
    <>
      <h1>反応トレーニング</h1>
      <p>好機を捉える初動を磨く</p>

      <div className='home__btnArea'>
        <button className="btn btn--big" onClick={() => navigate('/create')}>
          ＋ 新しい設定を作成
        </button>
      </div>

      <TimerList
        timers={timers}
        onDelete={handleDelete}
      />
    </>
  );
}

export default Home;