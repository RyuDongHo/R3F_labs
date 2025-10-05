import CurveScene from "@/Widget/CurveScene";
import SphereScene from "@/Widget/SphereScene";
import React from "react";
import useGsap from "./model/useGsap";

const Main = (): React.ReactElement => {
  const curveSceneRef = React.useRef<HTMLDivElement>(null!);
  const featuresRef = React.useRef<HTMLDivElement>(null!);
  useGsap({ curveSceneRef, featuresRef });
  return (
    <main className="w-full">
      {/* Sphere Scene */}
      <div className="w-full h-[100vh] flex flex-col items-center justify-end pt-8 gap-2">
        {/* Title */}
        <div className=" xl:pb-4 flex flex-col gap-2">
          <p className=" xl:text-3xl text-sm font-light tracking-wider">Hi.</p>
          <p className=" xl:text-3xl text-sm font-light tracking-wider">
            Welcome to My WorkShop
          </p>
        </div>
        <SphereScene />
        <div className="p-3 w-full flex justify-center">SCROLL TO SEE MORE</div>
      </div>

      <div className="w-full h-[100vh] flex flex-col items-center justify-end gap-2">
        <div ref={curveSceneRef} className="relative w-full h-full">
          <CurveScene />
          {/* Features Section */}
          <div
            ref={featuresRef}
            className="absolute top-0 right-0 flex xl:h-full xl:flex-col gap-2 w-min-[120px] justify-center pr-8 space-y-6"
          >
            <div className="feature-item bg-white/55 backdrop-blur-sm rounded-lg p-4 text-black max-w-xs shadow-lg max-h-[200px]">
              <a
                href="https://footballsquare.co.kr"
                target="_blank"
                className="text-m font-semibold mb-2 underline"
              >
                FootBall Square
              </a>
              <p className="text-xs opacity-80">
                A community and convenience service for FC24 game users
              </p>
            </div>
            <div className="feature-item bg-white/55 backdrop-blur-sm rounded-lg p-4 text-black max-w-xs shadow-lg max-h-[200px]">
              <a
                href="https://github.com/Stageus/DMap-homepage"
                target="_blank"
                className="text-m font-semibold mb-2 underline"
              >
                DMAP
              </a>
              <p className="text-xs opacity-80">
                A playful service that draws on the map through user movement
              </p>
            </div>
            <div className="feature-item bg-white/55 backdrop-blur-sm rounded-lg p-4 text-black max-w-xs shadow-lg max-h-[200px]">
              <a
                href="https://www.npmjs.com/package/rani-motion"
                target="_blank"
                className="text-m font-semibold mb-2 underline"
              >
                Rani-motion
              </a>
              <p className="text-xs opacity-80">
                A React-based animation library
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Main;
