import React from "react";
import * as THREE from "three";
import useSphereMovement from "./model/useSphereMovement";
import getRandomNonZero from "@/Shared/lib/getRandomNonZeroFloat";
import useRayCasterEffect from "./model/useRayCasterEffect";

const Sphere = React.memo(() => {
  const sphereGroupRef = React.useRef<THREE.Group>(null!);
  const center = new THREE.Vector3(0, 0, 0);
  const size = new THREE.Vector3(20, 20, 20);
  const repelRadius = 8; // 반경 내에서만 밀어내기
  const repelStrength = 30; // 힘의 세기(거리/초 기준)

  // 구체 초기 위치 설정
  const spherePositions = React.useMemo(() => {
    return Array.from({ length: 50 }, () => [
      getRandomNonZero({
        min: (-1 * size.x) / 2 + 1,
        max: size.x / 2 - 1,
      }),
      getRandomNonZero({
        min: (-1 * size.y) / 2 + 1,
        max: size.y / 2 - 1,
      }),
      getRandomNonZero({
        min: (-1 * size.z) / 2 + 1,
        max: size.z / 2 - 1,
      }),
    ]);
  }, [size.x, size.y, size.z]);

  // 구체 움직임 설정
  useSphereMovement({
    sphereRefs: sphereGroupRef,
    boxCenter: center,
    boxSize: size,
  });

  // 마우스 밀어내기 효과 설정
  useRayCasterEffect({
    sphereGroupRef,
    center,
    size,
    repelRadius,
    repelStrength,
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[15, 15, 15]}
        target-position={center}
        intensity={2}
      />

      <group ref={sphereGroupRef}>
        {spherePositions.map((position, index) => {
          return (
            <mesh key={index} position={position as [number, number, number]}>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshPhysicalMaterial
                color="#f0f0f0"
                transparent={false}
                metalness={0.0}
                roughness={0.3}
                clearcoat={0.8}
                clearcoatRoughness={0.05}
                reflectivity={0.7}
                ior={1.4}
              />
            </mesh>
          );
        })}
      </group>

      <boxHelper
        args={[
          new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z)),
          "white",
        ]}
        position={center}
      />
    </>
  );
});

export default Sphere;
