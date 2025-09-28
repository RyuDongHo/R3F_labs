import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls, ContactShadows } from "@react-three/drei";
import useColorChange from "./model/useColorChange";
import useMaterialInit from "./model/useMaterialInit";
import React from "react";

const Vehicle = (): React.ReactElement => {
  const vehicle = useLoader(GLTFLoader, "/3dModel/vehicle.glb");
  const spotLightRef = React.useRef<THREE.SpotLight>(null!);
  const directionalLightRef = React.useRef<THREE.DirectionalLight>(null!);
  const GLTFRef = React.useRef<THREE.Group>(null!);
  const cameraControlsRef = React.useRef<CameraControls>(null!);
  const [carClickHandler] = useColorChange({
    objects: vehicle,
    cameraControlsRef: cameraControlsRef,
  });
  useMaterialInit({ GLTFRef });

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <CameraControls
        ref={cameraControlsRef}
        dollyToCursor={true}
        minDistance={6}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2}
      /> */}
      <directionalLight
        ref={directionalLightRef}
        position={[7, 7, 7]}
        target-position={[0, 0, 0]}
        intensity={3}
      />
      <spotLight
        ref={spotLightRef}
        color={"white"}
        intensity={50}
        position={[-3, 10, 0]}
        distance={30}
        angle={Math.PI / 4}
        penumbra={0.5}
      />
      <primitive
        position={[0, 0, 0.3]}
        ref={GLTFRef}
        object={vehicle.scene}
        onClick={carClickHandler}
      />
      <ContactShadows
        resolution={512}
        scale={15}
        position={[0, 0, 0]}
        blur={0.5}
        opacity={0.8}
      />
    </>
  );
};

export default Vehicle;
