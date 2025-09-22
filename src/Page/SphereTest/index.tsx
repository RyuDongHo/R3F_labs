import { Canvas } from "@react-three/fiber";
import Sphere from "./ui/Sphere";

const SphereTest = () => {
  return (
    <main className=" w-full h-full flex flex-col items-center pt-8">
      <div className=" flex w-full p-[24px] items-center gap-[64px]">
        {/* Title */}
        <div className=" flex justify-between xl:w-[30%] w-full items-center">
          <h1 className=" xl:h-[64px] xl:text-3xl text-xl font-bold text-center my-4">
            Creative Labs.
          </h1>
          <div className=" flex flex-col">
            <strong className=" xl:text-2xl text-sm">Make</strong>
            <strong className=" xl:text-[16px] text-xs">
              Creative Things.
            </strong>
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center w-[96%] h-[calc(80%-128px)]">
        <Canvas
          className=" rounded-2xl"
          shadows
          camera={{
            fov: 90,
            near: 0.1,
            far: 1000,
            position: [15, 15, 15],
          }}
        >
          <color attach="background" args={["#151616"]} />
          <Sphere />
        </Canvas>
      </div>
    </main>
  );
};

export default SphereTest;
