import React, { useState } from "react";
import "./App.css";
import ColorPicker from "./ColorPicker";
import Cubie from "./Cubie";
import Position from "./Position";
import postData from "./util";

const INDEX_TO_COLOR: Record<number, string> = {
  0: "orange", // Orange
  3: "orange",
  6: "orange",
  9: "orange",
  5: "blue", // Blue
  10: "blue",
  16: "blue",
  23: "blue",
  1: "green", // Green
  8: "green",
  14: "green",
  19: "green",
  7: "grey", // White
  11: "grey",
  20: "grey",
  22: "grey",
  2: "yellow", // Yellow
  4: "yellow",
  13: "yellow",
  17: "yellow",
  12: "red", // Red
  15: "red",
  18: "red",
  21: "red",
};

const getSolutionFromRGBArr = (rgbArr: string[]) => {
  return postData('http://localhost:5000/', {'colors_list': rgbArr})
}

function App() {
  const [colorsLists, setColorsLists] = useState([[18, 19, 20, 3, 4, 5, 12, 13, 14, 9, 10, 11, 6, 7, 8, 15, 16, 17, 0, 1, 2, 21, 22, 23].map(i => INDEX_TO_COLOR[i])]);
  const [colorsListsIndex, setColorsListsIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");
  const [twists, setTwists] = useState<string[]>([])

  const updateCubieFaceColor = (newElem: string, oldIndex: number) => {
    let newPosition = colorsLists[colorsListsIndex].map((elem, i) =>
      i === oldIndex ? newElem : elem
    );
    let newColorsLists = colorsLists.map((pos, i) =>
      i === colorsListsIndex ? newPosition : pos
    );
    setColorsLists(newColorsLists);
  };

  const getCurTwist = () => {
    return colorsListsIndex === colorsLists.length-1 ? null : twists[colorsListsIndex]
  }


  const curPos = () => colorsLists[colorsListsIndex];

  const solveRubiks = () => { 
    getSolutionFromRGBArr(curPos()).then(sol => {
      setColorsLists(sol['colors_lists'])
      setTwists(sol['twists'])
    })
    setColorsListsIndex(0)
  }

  return (
    <div
      className="App"
      style={{ display: "grid", gridTemplateRows: "6fr 0.5fr 0.5fr 2fr", width: "50%" }}
    >
      <Position
        pos={colorsLists[colorsListsIndex]}
        cubieFaceClickHandler={(index) =>
          updateCubieFaceColor(selectedColor, index)
        }
        twist={getCurTwist()}
      ></Position>
      <select
        onChange={(event) => setColorsListsIndex(parseInt(event.target.value))}
        value={colorsListsIndex}
      >
        {colorsLists.map((pos, i) => (
          <option value={i}>{i}</option>
        ))}
      </select>
      <button onClick={() => solveRubiks()}>Solve</button>
      <ColorPicker
        colorClickHandle={(color) => setSelectedColor(color)}
      ></ColorPicker>
    </div>
  );
}

export default App;
