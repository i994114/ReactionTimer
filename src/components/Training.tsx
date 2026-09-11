import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadTimer } from "../utils/timerStorage";
import { useNavigate } from "react-router-dom";

function Training() {
  type Phase = 'countdown' | 'training' | 'interval' | 'finished';
  const [phase, setPhase] = useState<Phase>('countdown');

  const navigate = useNavigate();
  const {id} = useParams();
  const timer =  id? loadTimer(id) : undefined;
  const [startCountDown, setStartCountDown] = useState(3);
  const [trainingTime, setTrainingTime] = useState(timer?.trainingTime ?? 0);
  const [intervalTime, setIntervalTime] = useState(timer?.interval ?? 0);
  const [currentRound, setCurrentRound] = useState(1);

  const randomAudio = new Audio('/sounds/piro.mp3');
  const countdownAudio = new Audio('/sounds/countdown.mp3')
  const trainingStartAudio = new Audio('/sounds/start.mp3')
  const trainingEndAudio = new Audio('/sounds/end.mp3')

  const progress = trainingTime / timer?.trainingTime * 100;

  //開始ダウンタイマー
  useEffect(() => {
    if (phase !== 'countdown') {
      return;
    }

    const timerId = setInterval(() => {
      setStartCountDown((current) => {
        if (current > 1) {
          return current - 1;
        }
        clearInterval(timerId);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timerId);
  },[phase]);
  
  //開始カウントダウン終了後
  useEffect(() => {
    if (phase !== 'countdown') {
      return;
    }
    if (startCountDown !== 0) {
      return;
    }

    setPhase('training');
    trainingStartAudio.play();
  }, [phase, startCountDown]);

  //トレーニング時間
  useEffect(() => {
    if (phase !== 'training') {
      return;
    }
  
    const timerId = setInterval(() => {
      setTrainingTime((current) => {
        if (current > 1) {
          return current - 1;
        }
        clearInterval(timerId);
        return 0;
      });
    },1000)
    return () => clearInterval(timerId);
  },[phase]);
  
  //ランダム音
  useEffect(() => {
    if (phase !== 'training' || !timer) {
      return;
    }

    let timeoutId: number;
    const currentTimer = timer;

    function playRandomSound() {
      const randomTime =
        Math.random() * (currentTimer.randomMax - currentTimer.randomMin)
        + currentTimer.randomMin;
      
      timeoutId = setTimeout(() => {
        randomAudio.play();

        //ならしたら次の音を予約
        playRandomSound();
      }, randomTime * 1000);
    }

    playRandomSound();
    return () => clearTimeout(timeoutId);
  }, [phase]);

  //トレーニング終了後
  useEffect(() => {
    if (phase !== 'training') {
      return;
    }
    if (trainingTime !== 0) {
      return;
    }

    if (!timer) {
      return;
    }

    if (currentRound < timer.rounds) {
      setPhase('interval');
      trainingStartAudio.play()
    } else {
      setPhase('finished');
      trainingEndAudio.play();
    }
  }, [phase, trainingTime]);

  //インターバル時間
  useEffect(() => {
    
    if (phase !== 'interval') {
      return;
    }

    const timerId = setInterval(() => {
      setIntervalTime((current) => {
        if (current > 0) {
          return current - 1;
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [phase]);

  //インターバル終了後
  useEffect(() => {
    if (phase !== 'interval') {
      return;
    }

    if (intervalTime !== 0) {
      return;
    }

    if (!timer) {
      return;
    }

    setCurrentRound((current) => current + 1);
    setTrainingTime(timer.trainingTime);
    setIntervalTime(timer.interval);
    setPhase('training');
    trainingStartAudio.play();
  }, [intervalTime, phase, timer])

  //もう一回おこなう処理
  function handleRetry() {
    if (!timer) {
      return;
    }

    setStartCountDown(3);
    setTrainingTime(timer?.trainingTime);
    setIntervalTime(timer?.interval);
    setCurrentRound(1);
    setPhase('countdown');
  }

  //カウントダウンタイマー音
  useEffect(() => {
    if (phase !== 'countdown') {
      return;
    }

    if (startCountDown > 0) {
      countdownAudio.play();
    }

  }, [startCountDown, phase]);

  if (!timer) {
    return <p>タイマーが見つかりません。</p>;
  }
  
  return (
    <div className="training">
      <h1>{timer?.name}</h1>
      <button className="btn btn--big" onClick={() => navigate('/')} >一覧に戻る</button>
      {phase === 'countdown' && (
        <>
          <h2 className="training__title">トレーニング開始まで</h2>
          <div className="training__countArea"><p className="training__count training__count--big">{startCountDown}</p></div>
          
          <div className="training__setInfo">
            <p>ランダム：{timer?.randomMin}秒〜{timer.randomMax}秒</p>
            <p>トレーニング{formatTime(timer?.trainingTime)}</p>
            <p>インターバル：{formatTime(timer?.interval)}</p>
            <p>ターン数：{timer?.rounds}</p>        
          </div>
        </>
      )}
      
      {phase === 'training' && (
        <>
          <h2 className="training__title">トレーニング中</h2>
          <h2 >{currentRound} / {timer?.rounds} TURN</h2>
          <div className="training__countArea"  style={{ "--progress": `${progress}%` } as React.CSSProperties}>
            <p className="training__count training__count--small">{formatTime(trainingTime)}</p>
            <span className="training__count training__count--bottom">/{formatTime(timer.trainingTime)}</span>
          </div>
        </>
      )}

      {phase === 'interval' && (
        <>
          <h2 className="training__title">インターバル中</h2>
          <h2>{formatTime(intervalTime)}</h2>
          <h2>/{formatTime(timer?.interval)}</h2>
        </>
      )}
      
      {phase === 'finished' && (
        <>
          <button onClick={handleRetry} >もう一回</button>
        </>
      )}
    </div>
  );
}

//設定時間を分、秒に変換する処理
function formatTime(time: number | undefined) {
  if (time === undefined) {
    return '00:00';
  }

  const minitues = Math.floor(time / 60);
  const seconds = time % 60;

  return `${String(minitues).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


export default Training;