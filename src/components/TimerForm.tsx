import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loadTimers } from "../utils/timerStorage";
import { saveTimers } from "../utils/timerStorage";
import type { Timer } from "../types/timer";



function TimerForm() {
  const [name, setName] = useState('タイマーセット');
  const [randomMin, setRandomMin] = useState(1);
  const [randomMax, setRandomMax] = useState(2);
  const [trainingTime, setTrainingTime] = useState(30);
  const [interval, setinterval] = useState(10);
  const [rounds, setRounds] = useState(1);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const trimedName = name.trim();

    if (!trimedName) {
      setError('未入力欄があります');
      return
    }

    const newTimer: Timer = {
    	id: crypto.randomUUID(),
      name: trimedName,
      randomMin,
      randomMax,
      trainingTime,
      interval,
      rounds,
    };

    /* 既存のタイマー一覧を取得 */
    const savedTimers = loadTimers([]);

    /* 新しいタイマーを追加 */
    const updatedTimers = [...savedTimers, newTimer];

    /* ローカルストレージへ保存 */
    saveTimers(updatedTimers);

    navigate('/');

  }

	return (
		<form className="" onSubmit={handleSubmit}>
			<input 
				type="text"
				value={name}
        onChange={(event) => setName(event.target.value)}
				placeholder="タイマー名を入力"
			/>
			<input 
				type="number"
				value={randomMin}
        onChange={(event) => setRandomMin(Number(event.target.value))}
				placeholder="ランダム最小秒"
			/>
			<input 
				type="number"
				value={randomMax}
        onChange={(event) => setRandomMax(Number(event.target.value))}
				placeholder="ランダム最大秒"
			/>
			<input 
				type="number"
				value={trainingTime}
        onChange={(event) => setTrainingTime(Number(event.target.value))}
				placeholder="トレーニング時間"
			/>
			<input 
				type="number"
				value={interval}
        onChange={(event) => setinterval(Number(event.target.value))}
				placeholder="休憩時間"
			/>
			<input 
				type="number"
				value={rounds}
        onChange={(event) => setRounds(Number(event.target.value))}
				placeholder="何回それをやるか"
			/>

			<button className="" type="submit" >保存</button>

      {error && <span>{error}</span>}
		</form>
	);
}

export default TimerForm;