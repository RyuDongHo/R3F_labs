import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import React from "react";

const Curve = (): React.ReactElement => {
  const points: THREE.Vector3[] = [];
  const text = "creative coding explorations";
  const count = 360;
  const amplitude = 20;
  const division = 5;
  const curveGroupPosition = new THREE.Vector3(-(count / division) / 2, 0, 0);

  const curveGroupRef = React.useRef<THREE.Group>(null);

  for (let i = 0; i < count; i += 1) {
    const sin = Math.sin(THREE.MathUtils.degToRad(i)) * amplitude;
    const cos = Math.cos(THREE.MathUtils.degToRad(i)) * amplitude;
    points.push(new THREE.Vector3(i / division, sin, cos));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(text.length - 1);
  const pointsGroup: THREE.Vector3[][] = [];
  for (let i = 0; i < 3; i += 1) {
    pointsGroup.push(curvePoints);
  }
  useFrame(() => {
    if (curveGroupRef.current) {
      curveGroupRef.current.children.forEach((curve) => {
        curve.rotation.x += 0.002;

        curve.children.forEach((text) => {
          const pos = new THREE.Vector3();
          text.getWorldPosition(pos);
          const scale = THREE.MathUtils.mapLinear(
            pos.z,
            -amplitude,
            amplitude,
            0.2,
            1.5
          );
          text.scale.set(scale, scale, scale);
        });
      });
    }
  });

  return (
    <>
      <group position={curveGroupPosition} ref={curveGroupRef}>
        {pointsGroup.map((points, index) => {
          return (
            <group
              key={index}
              rotation={[(index * 2 * Math.PI) / pointsGroup.length, 0, 0]}
            >
              {points.map((point, i) => (
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
