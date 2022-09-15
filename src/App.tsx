import React, { useState } from "react";
import Popup from "reactjs-popup";
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
  return postData("/api", { colors_list: rgbArr });
};

const CONNECTION_FAILED_MSG = "Could not connect to Solver server"
const INVALID_INPUT_MSG = "Solve failed! Make sure input is valid; The front face should have orange on its top-left, with a green to its left and a yellow on its top"

function App() {
  const [colorsLists, setColorsLists] = useState([
    [
      2, 0, 1, 16, 17, 15, 9, 10, 11, 3, 4, 5, 7, 8, 6, 14, 12, 13, 18, 19, 20,
      21, 22, 23,
    ].map((i) => INDEX_TO_COLOR[i]),
  ]);
  const [colorsListsIndex, setColorsListsIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");
  const [twists, setTwists] = useState<string[]>([]);
  const [errorMsgPopupText, setErrorMsgPopupText] = useState(false)
  const [errorMsg, setErrorMsg] = useState(INVALID_INPUT_MSG);

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
    return colorsListsIndex === colorsLists.length - 1
      ? null
      : twists[colorsListsIndex];
  };

  const curPos = () => colorsLists[colorsListsIndex];

  const solveRubiks = () => {
    getSolutionFromRGBArr(curPos()).then((sol: Record<string, any>) => {
      if (!('colors_lists' in sol)) {
        // Handle Error cases (typically invalid rubik's input):
        setErrorMsg(INVALID_INPUT_MSG)
        setErrorMsgPopupText(true)
        return
      }
      setColorsLists(sol["colors_lists"]);
      setTwists(sol["twists"]);
      setColorsListsIndex(0);
    }).catch(e => {
      setErrorMsg(CONNECTION_FAILED_MSG)
      setErrorMsgPopupText(true)
    });
  };

  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateRows: "6fr 0.5fr 0.5fr 2fr",
        width: "50%",
      }}
    >
      <Position
        pos={colorsLists[colorsListsIndex]}
        cubieFaceClickHandler={(index) =>
          updateCubieFaceColor(selectedColor, index)
        }
        twist={getCurTwist()}
      ></Position>
      <div style={{ display: "flex" }}>
        {colorsLists.map((pos, i) => (
          <button style={{backgroundColor: colorsListsIndex===i ? 'darkgray' : '#F0F0F0'}} value={i} onClick={() => setColorsListsIndex(i)}>
            {"Step: " + i}
          </button>
        ))}
        <button
          onClick={() =>
            setColorsListsIndex(
              colorsListsIndex < colorsLists.length - 1
                ? colorsListsIndex + 1
                : colorsListsIndex
            )
          }
        >
          next
        </button>
      </div>
      <button onClick={() => solveRubiks()}>Solve</button>
      <ColorPicker
        colorClickHandle={(color) => setSelectedColor(color)}
      ></ColorPicker>
      <Popup open={errorMsgPopupText} position="right bottom" contentStyle={{position: 'absolute', zIndex: 1}}>
        <span>{errorMsg}</span>
        <button onClick={() => setErrorMsgPopupText(false)}>Close</button>
      </Popup>
    </div>
  );
}

export default App;
