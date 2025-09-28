import React from "react";
import * as THREE from "three";
import useSphereMovement from "./model/useSphereMovement";
import useRayCasterEffect from "./model/useRayCasterEffect";
import useInitSpheres from "./model/useInitSpheres";

type SphereProps = {
  isPointerEnter: boolean;
  sphereCount: number;
  colorPalette: "red" | "blue" | "green";
};

const Sphere = (props: SphereProps) => {
  const { isPointerEnter, sphereCount, colorPalette } = props;
  const sphereGroupRef = React.useRef<THREE.Group>(null!);
  const center = new THREE.Vector3(0, 0, 0);
  const boxSize = new THREE.Vector3(20, 20, 20);
  const repelRadius = 8; // 반경 내에서만 밀어내기
  const repelStrength = 50; // 힘의 세기(거리/초 기준)

  // 구체 초기 위치/색상 설정
  const [spherePositions, sphereColors] = useInitSpheres({
    sphereCount,
    boxSize: boxSize,
    colorPalette,
  });

  // 구체 움직임 설정
  useSphereMovement({
    sphereRefs: sphereGroupRef,
    boxCenter: center,
    boxSize: boxSize,
  });

  // 마우스 밀어내기 효과 설정
  useRayCasterEffect({
    sphereGroupRef,
    center,
    boxSize,
    repelRadius,
    repelStrength,
    effectActive: isPointerEnter,
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
                color={sphereColors[index]}
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
          new THREE.Mesh(new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z)),
          "white",
        ]}
        position={center}
      />
    </>
  );
};

export default Sphere;
