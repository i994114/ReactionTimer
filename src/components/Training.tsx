import { useState, useEffect } from "react";
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
  const [trainingTime, setTrainingTime] = useState(timer?.trainingTime);
  const [intervalTime, setIntervalTime] = useState(timer?.interval);
  const [currentRound, setCurrentRound] = useState(1);

  const audio = new Audio('/sounds/piro.mp3');
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

    function playRandomSound() {
      const randomTime =
        Math.random() * (timer.randomMax - timer.randomMin)
        + timer.randomMin;
      
      timeoutId = setTimeout(() => {
        audio.play();

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

    if (currentRound < timer.rounds) {
      setPhase('interval');
    } else {
      setPhase('finished');
    }
  }, [phase, trainingTime]);

  //インターバル時間
  useEffect(() => {
    
    if (phase !== 'interval') {
      return;
    }

    const timerId = setInterval(() => {
      setIntervalTime((current) => {
        if (current !== undefined && current > 0) {
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
  }, [intervalTime, phase, timer])

  //もう一回おこなう処理
  function handleRetry() {
    setStartCountDown(3);
    setTrainingTime(timer?.trainingTime);
    setIntervalTime(timer?.interval);
    setCurrentRound(1);
    setPhase('countdown');
  }

  return (
    <div>
      <h1>{timer?.name}</h1>
      <button onClick={() => navigate('/')} >一覧に戻る</button>
      {phase === 'countdown' && (
        <>
          <h2>トレーニング開始まで</h2>
          <h2>{startCountDown}</h2>
          <p>ランダム：{timer?.randomMin}〜{timer.randomMax}</p>
          <p>トレーニング{timer?.trainingTime}</p>
          <p>インターバル：{timer?.interval}</p>
          <p>ターン数：{timer?.rounds}</p>        
        </>
      )}
      
      {phase === 'training' && (
        <>
          <h2>{currentRound} / {timer?.rounds}</h2>
          <h1>トレーニング中</h1>
          <h2>{formatTime(trainingTime)}</h2>
          <h2>/{formatTime(timer.trainingTime)}</h2>
        </>
      )}

      {phase === 'interval' && (
        <>
          <h1>インターバル中</h1>
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