import React from "react";

type props = {
  colorClickHandle: (color: string) => void;
};

function ColorPicker({ colorClickHandle }: props) {
  const colors = ["red", "grey", "orange", "yellow", "blue", "green"];
  return (
    <div
      className="ColorPicker"
      style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
    >
      {colors.map((color) => (
        <div
          style={{
            backgroundColor: color,
          }}
          onClick={() => colorClickHandle(color)}
        ></div>
      ))}
    </div>
  );
}

export default ColorPicker;
