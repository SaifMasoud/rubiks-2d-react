import React, { CSSProperties, useState } from 'react';
import './App.css';
import Cubie from './Cubie';


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

}


const style: CSSProperties = {
  aspectRatio: '4/3',
  display: 'grid',
  gridTemplateRows: 'repeat(6, 1fr)',
  gridTemplateColumns: 'repeat(8, 1fr)',
  height: '300px'
}

const cubieIndexToColor = (i: number) => {
  return 'red'
}

const cubieIndexToRowCol = (i: number) => {
  return INDEX_TO_POS[i]
}

function Position() {
  const [positionArr, setPositionArr] = useState(Array.from(Array(CUBIES_COUNT).keys()))


  return (
    <div className="Position" style={style}>
      {positionArr.map(i => 
      <Cubie col={cubieIndexToRowCol(i)[1]} color={cubieIndexToColor(i)} onClick={() => {}} 
        row={cubieIndexToRowCol(i)[0]}
      />
      )}
    </div>
  );
}

export default Position;
