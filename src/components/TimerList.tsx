function TimerList({ timers }) {
  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.id}>{timer.name}</li>
      ))}
    </ul>
  );
}

export default TimerList;