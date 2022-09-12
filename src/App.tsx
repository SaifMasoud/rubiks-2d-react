import React, { useState } from "react";
import "./App.css";
import ColorPicker from "./ColorPicker";
import Cubie from "./Cubie";
import Position from "./Position";

const INDEX_TO_COLOR: Record<number, string> = {
  0: "rgb(255, 165, 0)", // Orange
  3: "rgb(255, 165, 0)",
  6: "rgb(255, 165, 0)",
  9: "rgb(255, 165, 0)",
  5: "rgb(0, 0, 255)", // Blue
  10: "rgb(0, 0, 255)",
  16: "rgb(0, 0, 255)",
  23: "rgb(0, 0, 255)",
  1: "rgb(0, 255, 0)", // Green
  8: "rgb(0, 255, 0)",
  14: "rgb(0, 255, 0)",
  19: "rgb(0, 255, 0)",
  7: "grey", // White
  11: "grey",
  20: "grey",
  22: "grey",
  2: "rgb(255, 255, 0)", // Yellow
  4: "rgb(255, 255, 0)",
  13: "rgb(255, 255, 0)",
  17: "rgb(255, 255, 0)",
  12: "rgb(255, 0, 0)", // Red
  15: "rgb(255, 0, 0)",
  18: "rgb(255, 0, 0)",
  21: "rgb(255, 0, 0)",
};

function App() {
  const [posList, setPosList] = useState([
    Array.from(Array(24).keys()).map((i) => INDEX_TO_COLOR[i]),
    [
      INDEX_TO_COLOR[13],
      INDEX_TO_COLOR[14],
      INDEX_TO_COLOR[12],
      INDEX_TO_COLOR[3],
      INDEX_TO_COLOR[4],
      INDEX_TO_COLOR[5],
      INDEX_TO_COLOR[2],
      INDEX_TO_COLOR[0],
      INDEX_TO_COLOR[1],
      INDEX_TO_COLOR[9],
      INDEX_TO_COLOR[10],
      INDEX_TO_COLOR[11],
      INDEX_TO_COLOR[20],
      INDEX_TO_COLOR[18],
      INDEX_TO_COLOR[19],
      INDEX_TO_COLOR[15],
      INDEX_TO_COLOR[16],
      INDEX_TO_COLOR[17],
      INDEX_TO_COLOR[7],
      INDEX_TO_COLOR[8],
      INDEX_TO_COLOR[6],
      INDEX_TO_COLOR[21],
      INDEX_TO_COLOR[22],
      INDEX_TO_COLOR[23],
    ],
  ]);
  const [posListIndex, setPosListIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");

  const updateCubieFaceColor = (newElem: string, oldIndex: number) => {
    let newPosition = posList[posListIndex].map((elem, i) =>
      i === oldIndex ? newElem : elem
    );
    let newPosList = posList.map((pos, i) =>
      i === posListIndex ? newPosition : pos
    );
    setPosList(newPosList);
  };

  return (
    <div
      className="App"
      style={{ display: "grid", gridTemplateRows: "6fr 1fr 2fr", width: "50%" }}
    >
      <Position
        pos={posList[posListIndex]}
        cubieFaceClickHandler={(index) =>
          updateCubieFaceColor(selectedColor, index)
        }
      ></Position>
      <select
        onChange={(event) => setPosListIndex(parseInt(event.target.value))}
      >
        {posList.map((pos, i) => (
          <option value={i}>{i}</option>
        ))}
      </select>
      <ColorPicker
        colorClickHandle={(color) => setSelectedColor(color)}
      ></ColorPicker>
    </div>
  );
}

export default App;
