import {useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadTimer, loadTimers } from "../utils/timerStorage";
import { saveTimers } from "../utils/timerStorage";

import type { Timer } from "../types/timer";
import type { FormEvent } from "react";


function TimerForm() {

  const {id} = useParams();
  const timer = id? loadTimer(id) : undefined;
  const title = id? '編集' : '設定';
  const [name, setName] = useState(timer?.name?? 'タイマーセット');
  const [randomMin, setRandomMin] = useState(timer?.randomMin?? 1);
  const [randomMax, setRandomMax] = useState(timer?.randomMax?? 2);
  const [trainingTime, setTrainingTime] = useState(timer?.trainingTime?? 30);
  const [interval, setinterval] = useState(timer?.interval?? 10);
  const [rounds, setRounds] = useState(timer?.rounds?? 1);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    <div>
      <h1>タイマー{title}</h1>
      <form className="timerForm__form" onSubmit={handleSubmit}>
        <label className="timerForm__label">設定名</label>
        <input 
          className="timerForm__input timerForm__input--normal"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="設定名を入力"
        />

        <label className="timerForm__label">ランダム時間(秒)</label>
        <div className="timerForm__randomTimeArea">
          <input
            className="timerForm__input timerForm__input--short" 
            type="number"
            value={randomMin}
            onChange={(event) => setRandomMin(Number(event.target.value))}
            placeholder="ランダム最小秒"
          />
          <span className="padding--small">〜</span>
          <input
            className="timerForm__input timerForm__input--short" 
            type="number"
            value={randomMax}
            onChange={(event) => setRandomMax(Number(event.target.value))}
            placeholder="ランダム最大秒"
          />
        </div>

        <label className="timerForm__label">トレーニング時間(秒)</label>
        <input
          className="timerForm__input timerForm__input--normal" 
          type="number"
          value={trainingTime}
          onChange={(event) => setTrainingTime(Number(event.target.value))}
          placeholder="トレーニング時間"
        />

        <label className="timerForm__label">休憩時間(秒)</label>
        <input
          className="timerForm__input timerForm__input--normal" 
          type="number"
          value={interval}
          onChange={(event) => setinterval(Number(event.target.value))}
          placeholder="休憩時間"
        />

        <label className="timerForm__label">ラウンド数</label>
        <input
          className="timerForm__input timerForm__input--normal" 
          type="number"
          value={rounds}
          onChange={(event) => setRounds(Number(event.target.value))}
          placeholder="何回それをやるか"
        />

        <div className="timerForm__btnArea timerForm__input--normal">
          <button className="btn btn--big btn--primary" type="submit" >保存する</button>
        </div>

        {error && <span>{error}</span>}
        <div className="timerForm__backArea">
          <Link to={"/"}>一覧に戻る</Link>
        </div>
      </form>
    </div>
	);
}

export default TimerForm;