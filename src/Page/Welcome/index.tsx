import { Canvas } from "@react-three/fiber";
import AngelSculpture from "./ui/AngelSculpture";
import React from "react";
import SideNav from "@/Widget/SideNav";
import LoadingScreen from "@/Widget/LoadingScreen";
import { useProgress } from "@react-three/drei";
import useMusicStore from "@/Shared/zustand/useMusicStore";

const Welcome = (): React.ReactElement => {
  const { progress } = useProgress();
  const { toggleMusic } = useMusicStore();
  return (
    <main className="w-full h-full relative">
      <LoadingScreen progress={progress} onStart={toggleMusic} />
      <Canvas
        shadows
        camera={{ fov: 70, position: [0.6, 1.9, 0.71], near: 0.1, far: 1000 }}
      >
        <AngelSculpture />
      </Canvas>
      <SideNav />
    </main>
  );
};

export default Welcome;
