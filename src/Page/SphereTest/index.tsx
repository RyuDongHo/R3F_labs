import { Canvas } from "@react-three/fiber";
import Sphere from "./ui/Sphere";
import useCameraPosition from "./model/useCameraPosition";
const SphereTest = () => {
  // 황금비율 기반 카메라 포지션 설정
  const cameraPosistion = useCameraPosition();
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
          className=" rounded-3xl"
          shadows
          camera={{
            fov: 90,
            near: 0.1,
            far: 1000,
            position: cameraPosistion,
          }}
        >
          <color attach="background" args={["#151616"]} />
          <Sphere />
        </Canvas>
      </div>
      <div className="p-3 w-full flex justify-center">SCROLL TO SEE MORE</div>
    </main>
  );
};

export default SphereTest;
