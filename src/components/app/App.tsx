import React, { useState, useEffect } from "react";
import { Main } from '../main';

export function App() {
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    fetch("/time")
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time);
      });
  }, []);
  return (
    <div className="App">
      <Main />
    </div>
  );
}
