import React, { CSSProperties } from "react";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX | string;

type props = {
  color: Color;
  onClick: () => void;
  row: number;
  col: number;
};

function Cube({ color = "red", row, col, onClick }: props) {
  return (
    <div
      className="Cube"
      style={{
        backgroundColor: color,
        gridRow: row,
        gridColumn: col,
        margin: "1px",
      }}
      onClick={onClick}
    ></div>
  );
}

export default Cube;
