import { useNavigate } from "react-router-dom";
import type { Timer } from "../types/timer";

type Props = {
  timers: Timer[];
  onDelete: (id: string) => void;
};

function TimerList({ timers, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.id}>
          {timer.name}
          <button onClick={() => navigate(`/training/${timer.id}`)}>開始</button>
          <button onClick={() => navigate(`/edit/${timer.id}`)}>編集</button>
          <button onClick={() => onDelete(timer.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
}

export default TimerList;