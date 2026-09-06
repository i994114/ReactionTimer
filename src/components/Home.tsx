import TimerList from './TimerList';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>反応トレーニング</h1>
      <p>好機を捉える初動を磨く</p>

      <button onClick={() => navigate('/create')}>
        ＋ 新しい設定を作成
      </button>

      {/* <TimerList /> */}
    </>
  );
}

export default Home;