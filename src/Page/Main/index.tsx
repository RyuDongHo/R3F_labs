import CurveScene from "@/Widget/CurveScene";
import SphereScene from "@/Widget/SphereScene";
import React from "react";
import useGsap from "./model/useGsap";
import FeatureBox from "./ui/FeatureBox";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

const Main = (): React.ReactElement => {
  const curveSceneRef = React.useRef<HTMLDivElement>(null!);
  const featuresRef = React.useRef<HTMLDivElement>(null!);
  useGsap({ curveSceneRef, featuresRef });
  return (
    <main className="w-full xl:pt-0 pt-2">
      {/* Sphere Scene */}
      <div className="w-full h-[100vh] flex flex-col items-center justify-end pt-8 gap-2">
        {/* Title */}
        <div className=" xl:pb-4 flex flex-col gap-1">
          <h3 className=" font-[500] text-2xl">Hi, I'm Frontend Developer</h3>
          <p className=" xl:text-3xl font-[600]">Welcome to My WorkShop</p>
          <p className=" xl:text-3xl font-[600]">Welcome to My WorkShop</p>
        </div>
        <SphereScene withCanvas={true} />
        <div className="p-3 w-full flex justify-center">SCROLL TO SEE MORE</div>
      </div>

      <div className="relative overflow-x-auto w-full h-[100vh] flex flex-col items-center xl:justify-center justify-end gap-2">
        {/* Curve Scene */}
        <div
          ref={curveSceneRef}
          className="xl:w-[60%] xl:h-[60%] xl:pb-0 pb-4 w-full h-[80%]"
        >
          <Canvas
            orthographic={true}
            camera={{
              zoom: 10,
              fov: 90,
              near: 0.1,
              far: 100,
              position: [0, 0, 25],
            }}
            className=" rounded-2xl border border-blue-600"
          >
            <CurveScene withCanvas={false} />
            <CameraControls />
            <axesHelper args={[100]} />
          </Canvas>
        </div>
        {/* Features Section */}
        <div
          ref={featuresRef}
          className="absolute top-0 right-0 w-full flex gap-2 justify-center pt-4"
        >
          <FeatureBox
            hrefLink="https://footballsquare.co.kr"
            title="FootBall Square"
            description="A community and convenience service for FC24 game users"
          />
          <FeatureBox
            hrefLink="https://github.com/Stageus/DMap-homepage"
            title="DMAP"
            description="A playful service that draws on the map through user movement"
          />
          <FeatureBox
            hrefLink="https://www.npmjs.com/package/rani-motion"
            title="Rani-motion"
            description="A React-based animation library"
          />
        </div>
      </div>
    </main>
  );
};
export default Main;
