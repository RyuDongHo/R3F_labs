import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
const Sphere = () => {
  const cameraControlsRef = React.useRef<CameraControls>(null!);
  const vecA = new THREE.Vector3(3, 4, 0);
  const vecB = new THREE.Vector3(-3, 0, 0);

  const sphereARef = React.useRef<THREE.Mesh>(null!);
  const sphereBRef = React.useRef<THREE.Mesh>(null!);
  const BtoAVec = vecA.clone().sub(vecB).normalize();
  const dis = vecA.distanceTo(vecB);
  useFrame((_, delta) => {
    if (sphereARef.current && sphereBRef.current) {
      const aObj = sphereARef.current;
      const bObj = sphereBRef.current;
      if (aObj.position.distanceTo(bObj.position) < 1) {
        return;
      }
      const moveVec = BtoAVec.clone()
        .multiplyScalar(dis)
        .divideScalar((1 / delta) * 3);
      bObj.position.x += moveVec.x;
      bObj.position.y += moveVec.y;
    }
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
      <directionalLight
        position={vecA}
        target-position={[0, 0, 0]}
        intensity={2}
      />
      <mesh position={vecA} ref={sphereARef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={vecB} ref={sphereBRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* <arrowHelper
        args={[vecA.clone().normalize(), origin, dis, "red", 0.5, 0.3]}
      /> */}
    </>
  );
};

export default Sphere;
