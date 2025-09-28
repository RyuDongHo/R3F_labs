import React from "react";
import * as THREE from "three";
import useSphereMovement from "./model/useSphereMovement";
import getRandomNonZero from "@/Shared/lib/getRandomNonZeroFloat";
import useRayCasterEffect from "./model/useRayCasterEffect";

const Sphere = React.memo(() => {
  const sphereGroupRef = React.useRef<THREE.Group>(null!);
  const center = new THREE.Vector3(0, 0, 0);
  const size = new THREE.Vector3(20, 20, 20);
  // 마우스 주변 반발(밀어내기) 효과 파라미터
  const repelRadius = 8; // 반경 내에서만 밀어내기
  const repelStrength = 30; // 힘의 세기(거리/초 기준)

  // 구체 초기 위치 메모이제이션 (재생성 방지)
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
  }, [size.x, size.y, size.z]); // size 의존성 추가

  useSphereMovement({
    // 구체 움직임 설정
    sphereRefs: sphereGroupRef,
    boxCenter: center,
    boxSize: size,
  });
  useRayCasterEffect({
    // 마우스 밀어내기 효과 설정
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
            <mesh
              key={index}
              position={position as [number, number, number]}
            >
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshPhysicalMaterial
                color="white"
                transparent
                metalness={0.2}
                roughness={0.5}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
              />
              {/* {index ? (
                <meshPhysicalMaterial
                  color="orange"
                  transparent
                  metalness={0.4}
                  roughness={0.2}
                  clearcoat={0.5}
                  clearcoatRoughness={0.1}
                />
              ) : (
                <meshStandardMaterial color="purple" />
              )} */}
            </mesh>
          );
        })}
      </group>

      <boxHelper
        args={[
          new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z)),
          "white",
        ]}
        onClick={(e) => {
          console.log(e.point.x + "\n");
          console.log(e.pointer.x + "\n");
          console.log(e.unprojectedPoint.x + "\n");
        }}
        position={center}
      />
    </>
  );
});

export default Sphere;
