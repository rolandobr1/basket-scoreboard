import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [foulsA, setFoulsA] = useState(0);
  const [foulsB, setFoulsB] = useState(0);
  const [period, setPeriod] = useState(1);
  const [time, setTime] = useState(600); // 10:00 minutes
  const [running, setRunning] = useState(false);
  const timerRef = useRef();

  // Time handling
  React.useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const formatTime = (t) => {
    const min = String(Math.floor(t / 60)).padStart(2, "0");
    const sec = String(t % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="scoreboard">
      <h1>Basket Scoreboard</h1>
      <div className="controls">
        <div className="team">
          <h2>Equipo A</h2>
          <div className="score">{scoreA}</div>
          <button onClick={() => setScoreA(scoreA + 1)}>+1</button>
          <button onClick={() => setScoreA(scoreA - 1)} disabled={scoreA === 0}>-1</button>
          <div className="fouls">Faltas: {foulsA}</div>
          <button onClick={() => setFoulsA(foulsA + 1)}>+ Falta</button>
          <button onClick={() => setFoulsA(foulsA - 1)} disabled={foulsA === 0}>- Falta</button>
        </div>
        <div className="timer">
          <h2>Tiempo</h2>
          <div className="time">{formatTime(time)}</div>
          <button onClick={() => setRunning(true)} disabled={running}>Iniciar</button>
          <button onClick={() => setRunning(false)} disabled={!running}>Pausar</button>
          <button onClick={() => { setTime(600); setRunning(false); }}>Reset</button>
          <div className="periodo">
            <span>Periodo: {period}</span>
            <button onClick={() => setPeriod(period + 1)}>+1</button>
            <button onClick={() => setPeriod(period - 1)} disabled={period === 1}>-1</button>
          </div>
        </div>
        <div className="team">
          <h2>Equipo B</h2>
          <div className="score">{scoreB}</div>
          <button onClick={() => setScoreB(scoreB + 1)}>+1</button>
          <button onClick={() => setScoreB(scoreB - 1)} disabled={scoreB === 0}>-1</button>
          <div className="fouls">Faltas: {foulsB}</div>
          <button onClick={() => setFoulsB(foulsB + 1)}>+ Falta</button>
          <button onClick={() => setFoulsB(foulsB - 1)} disabled={foulsB === 0}>- Falta</button>
        </div>
      </div>
    </div>
  );
}

export default App;