import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadTimer } from "../utils/timerStorage";
import { useNavigate } from "react-router-dom";

function Training() {
  const navigate = useNavigate();
  const {id} = useParams();
  const timer =  id? loadTimer(id) : undefined;
  const [startCountDown, setStartCountDown] = useState(3);
  const [trainingTime, setTrainingTime] = useState(timer?.trainingTime);
  const [intervalTime, setIntervalTime] = useState(timer?.interval);

  //開始ダウンタイマー
  useEffect(() => {
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
  },[]);
  
  //トレーニング時間
  useEffect(() => {
    //開始タイマー作動中はカウントしない
    if (startCountDown > 0) {
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
  },[startCountDown]);
  
  //インターバル時間
  useEffect(() => {
    //トレーニング時間中はカウントしない
    if (trainingTime > 0) {
      return;
    }

    const timerId = setInterval(() => {
      setIntervalTime((current) => {
        if (current > 1) {
          return current - 1;
        }
        clearInterval(timerId);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [trainingTime]);


  return (
    <div>
      <h1>{timer?.name}</h1>
      <button onClick={() => navigate('/')} >一覧に戻る</button>
      {startCountDown > 0? (
        <>
          <h2>トレーニング開始まで</h2>
          <h2>{startCountDown}</h2>
          <p>ランダム：{timer?.randomMin}〜{timer.randomMax}</p>
          <p>トレーニング{timer?.trainingTime}</p>
          <p>インターバル：{timer?.interval}</p>
          <p>ターン数：{timer?.rounds}</p>        
        </>
      ) : (
        <>
          <h1>トレーニング中</h1>
          <h2>{formatTime(trainingTime)}</h2>
          <h2>/{formatTime(timer.trainingTime)}</h2>

          <h1>インターバル中</h1>
          <h2>{formatTime(intervalTime)}</h2>
          <h2>/{formatTime(timer?.interval)}</h2>

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