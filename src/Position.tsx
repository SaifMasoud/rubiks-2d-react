import React, { CSSProperties, useState } from "react";
import "./App.css";
import Cubie from "./Cubie";

const CUBIES_COUNT = 24;
const INDEX_TO_POS: Record<number, number[]> = {
  0: [3, 3],
  1: [3, 2],
  2: [2, 3],

  3: [3, 4],
  4: [2, 4],
  5: [3, 5],

  6: [4, 3],
  7: [5, 3],
  8: [4, 2],

  9: [4, 4],
  10: [4, 5],
  11: [5, 4],

  12: [3, 8],
  13: [1, 3],
  14: [3, 1],

  15: [3, 7],
  16: [3, 6],
  17: [1, 4],

  18: [4, 8],
  19: [4, 1],
  20: [6, 3],

  21: [4, 7],
  22: [6, 4],
  23: [4, 6],
};
const twistNameToPos = (name: string) => {
  return ["F", "Fi"].some((t) => name === t)
    ? [5, 5]
    : ["L", "Li"].some((t) => name === t)
    ? [7, 3]
    : [3, 9];
};

const TWIST_NAME_TO_ARROW_FILE: Record<string, string> = {
  U: "Up.png",
  F: "Front.png",
  L: "Left.png",
  Ui: "UpI.png",
  Fi: "FrontI.png",
  Li: "LeftI.png",
};

const style: CSSProperties = {
  aspectRatio: "4/3",
  display: "grid",
  gridTemplateRows: "repeat(7, 1fr)",
  gridTemplateColumns: "repeat(9, 1fr)",
  height: "300px",
};

const cubieIndexToRowCol = (i: number) => {
  return INDEX_TO_POS[i];
};

type props = {
  pos: string[];
  cubieFaceClickHandler: (index: number) => void;
  twist: string | null;
};

function Position({ pos, cubieFaceClickHandler, twist }: props) {
  return (
    <div className="Position" style={style}>
      {pos.map((color, actualIndex) => (
        <Cubie
          col={cubieIndexToRowCol(actualIndex)[1]}
          color={color}
          onClick={() => {
            cubieFaceClickHandler(actualIndex);
          }}
          row={cubieIndexToRowCol(actualIndex)[0]}
        />
      ))}
      {twist != null ? (
        <div
          style={{
            gridRow: twistNameToPos(twist)[0],
            gridColumn: twistNameToPos(twist)[1],
          }}
        >
          <img
            src={require("./" + TWIST_NAME_TO_ARROW_FILE[twist])}
            style={{ maxWidth: "100%", height: "auto" }}
          ></img>
        </div>
      ) : null}
    </div>
  );
}

export default Position;
