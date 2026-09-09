import {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadTimer, loadTimers } from "../utils/timerStorage";
import { saveTimers } from "../utils/timerStorage";
import type { Timer } from "../types/timer";



function TimerForm() {

  const {id} = useParams();
  const timer = id? loadTimer(id) : undefined;

  const [name, setName] = useState(timer?.name?? 'タイマーセット');
  const [randomMin, setRandomMin] = useState(timer?.randomMin?? 1);
  const [randomMax, setRandomMax] = useState(timer?.randomMax?? 2);
  const [trainingTime, setTrainingTime] = useState(timer?.trainingTime?? 30);
  const [interval, setinterval] = useState(timer?.interval?? 10);
  const [rounds, setRounds] = useState(timer?.rounds?? 1);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const trimedName = name.trim();
    let updatedTimers: Timer[];

    /* バリデーション */    
    if (!trimedName) {
      setError('未入力欄があります');
      return
    }

    if (
      randomMin <= 0 ||
      randomMax <= 0 ||
      trainingTime <= 0 ||
      interval <= 0 ||
      rounds <= 0
    ) {
      setError('時間・回数は1以上を入力してください');
      return;
    }    

    /* 既存のタイマー一覧を取得 */
    const savedTimers = loadTimers([]);

    if (id) {
      /* 既存のタイマーを編集 */
      updatedTimers = savedTimers.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              name: trimedName,
              randomMin,
              randomMax,
              trainingTime,
              interval,
              rounds,
            }
          : timer
      );

    } else {
      /* 新しいタイマーを追加 */
      const newTimer: Timer = {
        id: crypto.randomUUID(),
        name: trimedName,
        randomMin,
        randomMax,
        trainingTime,
        interval,
        rounds,
      };
      updatedTimers = [...savedTimers, newTimer];
    }

    /* ローカルストレージへ保存 */
    saveTimers(updatedTimers);

    navigate('/');

  }

	return (
		<form className="" onSubmit={handleSubmit}>
      タイマー名
			<input 
				type="text"
				value={name}
        onChange={(event) => setName(event.target.value)}
				placeholder="タイマー名を入力"
			/>
      最小
			<input 
				type="number"
				value={randomMin}
        onChange={(event) => setRandomMin(Number(event.target.value))}
				placeholder="ランダム最小秒"
			/>
      最大
			<input 
				type="number"
				value={randomMax}
        onChange={(event) => setRandomMax(Number(event.target.value))}
				placeholder="ランダム最大秒"
			/>
      トレ時間
			<input 
				type="number"
				value={trainingTime}
        onChange={(event) => setTrainingTime(Number(event.target.value))}
				placeholder="トレーニング時間"
			/>
      休憩時間
			<input 
				type="number"
				value={interval}
        onChange={(event) => setinterval(Number(event.target.value))}
				placeholder="休憩時間"
			/>
      ラウンド数
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