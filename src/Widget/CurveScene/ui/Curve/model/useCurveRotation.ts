import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React from "react";

type UseCurveProps = {
  curveGroupRef: React.RefObject<THREE.Group>;
  text: string;
  amplitude: number;
  division: number;
};

const useCurve = (
  props: UseCurveProps
): [
  curveGroupPosition: THREE.Vector3,
  pointsGroup: THREE.Vector3[][],
  points: THREE.Vector3[]
] => {
  const { curveGroupRef, text, amplitude, division } = props;

  const count = 360;
  const curveGroupPosition = new THREE.Vector3(-(count / division) / 2, 0, 0);
  const points: THREE.Vector3[] = []; // 커브의 포인트들
  const pointsGroup: THREE.Vector3[][] = []; // 커브 포인트 그룹
  const curve = new THREE.CatmullRomCurve3(points);

  // 포인트 초기화
  for (let i = 0; i < count; i += 1) {
    const sin = Math.sin(THREE.MathUtils.degToRad(i)) * amplitude;
    const cos = Math.cos(THREE.MathUtils.degToRad(i)) * amplitude;
    points.push(new THREE.Vector3(i / division, sin, cos));
  }
  // 커브 초기화
  const curvePoints = curve.getPoints(text.length - 1);
  for (let i = 0; i < 3; i += 1) {
    pointsGroup.push(curvePoints);
  }

  useFrame((_, delta) => {
    if (curveGroupRef.current) {
      curveGroupRef.current.children.forEach((curve) => {
        curve.rotation.x += delta;

        curve.children.forEach((text) => {
          const pos = new THREE.Vector3();
          text.getWorldPosition(pos);
          const scale = THREE.MathUtils.mapLinear(
            pos.z,
            -amplitude,
            amplitude,
            0.1,
            2.0
          );
          text.scale.set(scale, scale, scale);
        });
      });
    }
  });

  return [curveGroupPosition, pointsGroup, points];
};

export default useCurve;
