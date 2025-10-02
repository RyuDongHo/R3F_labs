import React from "react";
import * as THREE from "three";
import useSphereMovement from "./model/useSphereMovement";
import useRayCasterEffect from "./model/useRayCasterEffect";
import useInitSpheres from "./model/useInitSpheres";

type SpheresProps = {
  isPointerEnter?: boolean;
  sphereCount?: number;
  colorPalette?: "red" | "blue" | "green";
  center?: THREE.Vector3;
  boxSize?: THREE.Vector3;
  repelRadius?: number;
  repelStrength?: number;
  boxWireFrame?: boolean;
};

const Spheres = (props: SpheresProps): React.ReactElement => {
  const {
    isPointerEnter = false,
    sphereCount = 40,
    colorPalette = "red",
    center = new THREE.Vector3(0, 0, 0),
    boxSize = new THREE.Vector3(20, 20, 20),
    repelRadius = 8,
    repelStrength = 50,
    boxWireFrame = false,
  } = props;
  const sphereGroupRef = React.useRef<THREE.Group>(null!);

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

      {boxWireFrame && (
        <mesh position={center}>
          <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
          <meshBasicMaterial wireframe color="white" />
        </mesh>
      )}
    </>
  );
};

export default Spheres;
