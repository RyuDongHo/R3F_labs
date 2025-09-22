import { CameraControls } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import useSphereMovement from "./model/useSphereMovement";
import getRandomNonZero from "@/Shared/lib/getRandomNonZeroFloat";
const Sphere = () => {
  const cameraControlsRef = React.useRef<CameraControls>(null!);
  const sphereGroupRef = React.useRef<THREE.Group>(null!);

  const center = new THREE.Vector3(0, 0, 0);
  const size = new THREE.Vector3(20, 20, 20);

  useSphereMovement({
    sphereRefs: sphereGroupRef,
    boxCenter: center,
    boxSize: size,
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <CameraControls
        ref={cameraControlsRef}
        dollyToCursor={true}
        minDistance={6}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2}
      />
      <directionalLight
        position={[0, 0, 15]}
        target-position={[0, 0, 0]}
        intensity={1}
      />
      <group ref={sphereGroupRef}>
        {Array.from({ length: 25 }, (_, index) => {
          return (
            <mesh
              key={index}
              position={[
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
              ]}
            >
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          );
        })}
      </group>

      <boxHelper
        args={[new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z)), "blue"]}
        
        position={center}
      />
    </>
  );
};

export default Sphere;
