import { CameraControls } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import useSphereMovement from "./model/useSphereMovement";
const Sphere = () => {
  const cameraControlsRef = React.useRef<CameraControls>(null!);
  const sphereGroupRef = React.useRef<THREE.Group>(null!);
  const box = new THREE.Box3();
  const center = new THREE.Vector3(0, 0, 0);
  const size = new THREE.Vector3(10, 10, 10);
  box.setFromCenterAndSize(center, size);

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
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />
      <directionalLight target-position={[0, 0, 0]} intensity={2} />
      <group ref={sphereGroupRef}>
        {Array.from({ length: 7 }, (_, index) => {
          return (
            <mesh key={index} position={center}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          );
        })}
      </group>
      <box3Helper args={[box, "blue"]} />
    </>
  );
};

export default Sphere;
