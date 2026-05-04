import React, { useState, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const start = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Stopwatch</h2>
      <h1>{formatTime(time)}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={addLap}>Lap</button>
      <button onClick={reset}>Reset</button>

      <h3>Laps</h3>
      <ul>
        {laps.map((lap, i) => (
          <li key={i}>Lap {i + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}
