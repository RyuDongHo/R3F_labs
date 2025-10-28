import React from "react";
import SideNav from "@/Widget/SideNav";
import LoadingScreen from "@/Widget/LoadingScreen";
import { useProgress } from "@react-three/drei";
import useMusicStore from "@/Shared/zustand/useMusicStore";
import AngelSculptureScene from "@/Widget/AngelSculptureScene";

const Welcome = (): React.ReactElement => {
  const { progress } = useProgress();
  const { toggleMusic } = useMusicStore();
  return (
    <main className="w-full h-full relative">
      <LoadingScreen progress={progress} onStart={toggleMusic} />
      <AngelSculptureScene />
      <SideNav />
    </main>
  );
};

export default Welcome;
