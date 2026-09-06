import {useState} from "react";




function TimerForm({ onAdd }) {
  const [text, setText] = useState('1');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimedText = text.trim();

    if (!trimedText) {
      setError('入力してください');
      return
    }

    onAdd(trimedText);
    setText('');
    setError('');

  }

	return (
		<form className="" onSubmit={handleSubmit}>
			<input 
				type="text"
				value={text}
        onChange={(event) => setText(event.target.value)}
				placeholder="タイマー名を入力"
			/>
			<button className="" type="submit" >追加</button>

      {error && <span>{error}</span>}
		</form>
	);
}

export default TimerForm;