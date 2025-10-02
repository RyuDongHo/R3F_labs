import { Canvas } from "@react-three/fiber";
import React from "react";
import Curve from "./ui/Curve";

const CurveScene = (): React.ReactElement => {
  return (
    <>
      <Canvas
        orthographic={true}
        camera={{
          zoom: 10,
          fov: 90,
          near: 0.1,
          far: 1000,
          position: [0, 0, 25],
        }}
        className=" rounded-4xl"
      >
        <color attach="background" args={["#151616"]} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.5} />
        <Curve text="vite react three drei tailwind zustand" />
      </Canvas>
    </>
  );
};

export default CurveScene;
