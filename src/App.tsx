import React, { useState } from "react";
import "./App.css";
import Cubie from "./Cubie";
import Position from "./Position";

function App() {
  const [pos, setPos] = useState(Array.from(Array(24).keys()))
  return (
    <div className="App">
      <Position pos={pos}></Position>
      <button onClick={() => setPos([13, 14, 12, 3, 4, 5, 2, 0, 1, 9, 10, 11, 20, 18, 19, 15, 16, 17, 7, 8, 6, 21, 22, 23])}>POSITION CHANGE</button>
    </div>
  );
}

export default App;
