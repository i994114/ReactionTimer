import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";

function Training() {
  const {id} = useParams();
  const [countDown, setCountDown] = useState(3);

  /* 開始ダウンタイマー */
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((current) => current > 0? current - 1 : current);
    }, 1000);

    return () => clearInterval(timerId);
  },[]);
  
  
  return (
    <div>
      <h1>Training!!!!</h1>
      <h2>{countDown}</h2>
    </div>
  );
}

export default Training;