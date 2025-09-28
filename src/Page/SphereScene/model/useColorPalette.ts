import React from "react";

const useColorPalette = (): [
  colorPalette: "red" | "blue" | "green",
  changeColorPalette: () => void
] => {
  const [colorPalette, setColorPalette] = React.useState<
    "red" | "blue" | "green"
  >("red");

  const changeColorPalette = () => {
    setColorPalette((prev) => {
      if (prev === "red") return "blue";
      if (prev === "blue") return "green";
      return "red";
    });
  };
  return [colorPalette, changeColorPalette];
};
export default useColorPalette;
