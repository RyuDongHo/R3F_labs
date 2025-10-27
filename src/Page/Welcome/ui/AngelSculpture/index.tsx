import { useLoader } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import useInitSculpture from "./model/useInitSculpture";
import useCameraMovement from "./model/useCameraMovement";
import useLightMovement from "./model/useLightMovement";

const AngelSculpture = (): React.ReactElement => {
  const angelSculpture = useLoader(GLTFLoader, "/3dModel/angel_sculpture.glb");
  const lightRef = React.useRef<THREE.PointLight>(null!);

  useInitSculpture({ angelSculpture });
  useCameraMovement();
  useLightMovement({ lightRef, angelSculpture });

  return (
    <>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.35} />
      <pointLight
        ref={lightRef}
        distance={8}
        intensity={1.2}
        decay={2}
        position={[0.6, 1.9, 0.71]}
      />
      <primitive
        rotation={[-0.24, 3.01, -0.12]}
        position={[0, 1, 0]}
        object={angelSculpture.scene}
      />
    </>
  );
};

export default AngelSculpture;
