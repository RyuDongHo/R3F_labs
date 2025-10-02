import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import React from "react";
import useCurve from "./model/useCurveRotation";

const Curve = (): React.ReactElement => {
  const text = "creative coding explorations";
  const amplitude = 20;
  const division = 5;
  const curveGroupRef = React.useRef<THREE.Group>(null!);

  const [curveGroupPosition, pointsGroup] = useCurve({
    curveGroupRef,
    text,
    amplitude,
    division,
  });
  return (
    <>
      <group position={curveGroupPosition} ref={curveGroupRef}>
        {pointsGroup?.map((points, index) => {
          return (
            <group
              key={index}
              rotation={[(index * 2 * Math.PI) / pointsGroup.length, 0, 0]}
            >
              {points?.map((point, i) => (
                <Billboard key={i} position={point}>
                  <Text color={"white"} fontSize={2} fontWeight={"bold"}>
                    {text[i]}
                  </Text>
                </Billboard>
              ))}
            </group>
          );
        })}
      </group>
    </>
  );
};

export default Curve;
