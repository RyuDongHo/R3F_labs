import * as THREE from "three";

type GetHSLColorProps = {
  colorPalette: "red" | "blue" | "green";
};
const getHSLColor = (props: GetHSLColorProps): string => {
  const { colorPalette } = props;
  // 색상 팔레트에 따라 HSL 값 범위 설정
  let hueRange: [number, number];
  switch (colorPalette) {
    case "red":
      hueRange = [0, 60];
      break;
    case "blue":
      hueRange = [180, 240];
      break;
    case "green":
      hueRange = [60, 180];
      break;
  }
  const hue = THREE.MathUtils.randInt(hueRange[0], hueRange[1]); // 0 to 359
  const saturation = THREE.MathUtils.randInt(60, 100); // 60% to 100%
  const lightness = THREE.MathUtils.randInt(40, 80); // 40% to 80%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
export default getHSLColor;
