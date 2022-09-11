import React, { useState } from "react";
import "./App.css";
import Cubie from "./Cubie";
import Position from "./Position";

function App() {
  const [posList, setPosList] = useState([Array.from(Array(24).keys()), [13, 14, 12, 3, 4, 5, 2, 0, 1, 9, 10, 11, 20, 18, 19, 15, 16, 17, 7,8, 6, 21, 22, 23,]])
  const [posListIndex, setPosListIndex] = useState(0)
  return (
    <div className="App">
      <Position pos={posList[posListIndex]}></Position>
      <select onChange={(event) => setPosListIndex(parseInt(event.target.value))}>
        {posList.map((pos, i) => <option value={i}>{pos}</option>)}
      </select>
    </div>
  );
}

export default App;
