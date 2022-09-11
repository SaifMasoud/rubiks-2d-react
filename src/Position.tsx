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

  18: [4, 7],
  19: [4, 1],
  20: [6, 3],

  21: [4, 8],
  22: [6, 4],
  23: [4, 6],
};

const style: CSSProperties = {
  aspectRatio: "4/3",
  display: "grid",
  gridTemplateRows: "repeat(6, 1fr)",
  gridTemplateColumns: "repeat(8, 1fr)",
  height: "300px",
};

const cubieIndexToRowCol = (i: number) => {
  return INDEX_TO_POS[i];
};

type props = {
  pos: string[];
};

function Position({ pos }: props) {
  return (
    <div className="Position" style={style}>
      {pos.map((color, actualIndex) => (
        <Cubie
          col={cubieIndexToRowCol(actualIndex)[1]}
          color={color}
          onClick={() => {}}
          row={cubieIndexToRowCol(actualIndex)[0]}
        />
      ))}
    </div>
  );
}

export default Position;
