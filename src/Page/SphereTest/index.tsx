import { Canvas } from "@react-three/fiber";
import Sphere from "./ui/Sphere";
import useCameraPosition from "./model/useCameraPosition";
import React from "react";
const SphereTest = (): React.ReactElement => {
  // 황금비율 기반 카메라 포지션 설정
  const cameraPosistion = useCameraPosition();
  // 마우스 오버 상태
  const [isPointerEnter, setIsPointerEnter] = React.useState<boolean>(false);
  // 색상 팔레트
  const [colorPalette, setColorPalette] = React.useState<
    "red" | "blue" | "green"
  >("red");

  return (
    <main className=" w-full h-full flex flex-col items-center justify-end pt-8 gap-2">
      {/* Title */}
      <div className=" xl:pb-[32px] flex flex-col gap-2">
        <p className=" xl:text-4xl text-lg">Crafting Digital Excellence</p>
        <p className=" xl:text-3xl text-sm font-light tracking-wider">
          Where Innovation Meets Artistry.
        </p>
        <p className=" xl:text-3xl text-sm font-light tracking-wider">
          Pushing Boundaries. Creating Tomorrow.
        </p>
      </div>
      <div className=" flex justify-center items-center w-full h-[calc(86%-128px)]">
        <Canvas
          onPointerEnter={() => setIsPointerEnter(true)}
          onPointerLeave={() => setIsPointerEnter(false)}
          onClick={() => {
            setColorPalette((prev) => {
              if (prev === "red") return "blue";
              if (prev === "blue") return "green";
              return "red";
            });
            console.log(colorPalette);
          }}
          className=" rounded-3xl cursor-pointer"
          shadows
          camera={{
            fov: 90,
            near: 0.1,
            far: 1000,
            position: cameraPosistion,
          }}
        >
          <color attach="background" args={["#151616"]} />
          <Sphere
            isPointerEnter={isPointerEnter}
            sphereCount={40}
            colorPalette={colorPalette}
          />
        </Canvas>
      </div>
      <div className="p-3 w-full flex justify-center">SCROLL TO SEE MORE</div>
    </main>
  );
};

export default SphereTest;
