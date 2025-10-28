import { Canvas } from "@react-three/fiber";
import React from "react";
import AngelSculpture from "./ui/AngelSculpture";
const AngelSculptureScene = (): React.ReactElement => {
  return (
    <Canvas
      shadows
      camera={{ fov: 70, position: [0.6, 1.9, 0.71], near: 0.1, far: 1000 }}
    >
      <AngelSculpture />
    </Canvas>
  );
};

export default AngelSculptureScene;
