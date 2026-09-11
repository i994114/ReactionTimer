import { useNavigate } from "react-router-dom";
import type { Timer } from "../types/timer";
import { Play, Pencil, Trash2 } from 'lucide-react';

type Props = {
  timers: Timer[];
  onDelete: (id: string) => void;
};

function TimerList({ timers, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <ul>
      {timers.map((timer) => (
        <li className="card" key={timer.id}>
          <p className="card__name">{timer.name}</p>
          <p className="card__set--small">ランダム：{timer.randomMin}秒〜{timer.randomMax}秒</p>
          <p className="card__time card__set--small">トレーニング：{timer.trainingTime}</p>
          <p className="card__time card__set--small">インターバル：{timer.interval}</p>
          <p className="card__set--small">ターン数：{timer.rounds}</p>
          <div className="card__btnArea">
            <button className="btn btn--small btn--normal" onClick={() => navigate(`/training/${timer.id}`)}>
              <Play size={20}></Play>
              開始
            </button>
            <button className="btn btn--small btn--low" onClick={() => navigate(`/edit/${timer.id}`)}>
              <Pencil size={20}></Pencil>
              編集
            </button>
            <button className="btn btn--small btn--danger" onClick={() => onDelete(timer.id)}>
              <Trash2 size={20}></Trash2>
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TimerList;