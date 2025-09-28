import getHSLColor from "@/Shared/lib/getHSLColor";
import getRandomNonZero from "@/Shared/lib/getRandomNonZeroFloat";
import React from "react";
import * as THREE from "three";

type UseSphereMovementProps = {
  sphereCount: number;
  colorPalette: "red" | "blue" | "green";
  boxSize: THREE.Vector3;
};

const useInitSpheres = (
  props: UseSphereMovementProps
): [spherePositions: number[][], sphereColors: string[]] => {
  const { sphereCount, colorPalette = "red", boxSize } = props;

  // 구체 초기 위치 설정
  const spherePositions: number[][] = React.useMemo(() => {
    return Array.from({ length: sphereCount }, () => [
      getRandomNonZero({
        min: (-1 * boxSize.x) / 2 + 1,
        max: boxSize.x / 2 - 1,
      }),
      getRandomNonZero({
        min: (-1 * boxSize.y) / 2 + 1,
        max: boxSize.y / 2 - 1,
      }),
      getRandomNonZero({
        min: (-1 * boxSize.z) / 2 + 1,
        max: boxSize.z / 2 - 1,
      }),
    ]);
  }, [boxSize.x, boxSize.y, boxSize.z, sphereCount]);

  const sphereColors: string[] = React.useMemo(() => {
    return Array.from({ length: sphereCount }, () =>
      getHSLColor({ colorPalette })
    );
  }, [colorPalette, sphereCount]);

  return [spherePositions, sphereColors];
};

export default useInitSpheres;
