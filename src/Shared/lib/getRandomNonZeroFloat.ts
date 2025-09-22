import * as THREE from "three";

type GetRandomNonZeroProps = {
  min?: number;
  max?: number;
};

const getRandomNonZero = (props: GetRandomNonZeroProps) => {
  const { min = 0.5, max = 4.5 } = props;
  return Math.random() > 0.5
    ? THREE.MathUtils.randFloat(min, max) // 양수
    : THREE.MathUtils.randFloat(-max, -min); // 음수
};

export default getRandomNonZero;
