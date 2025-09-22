import { Canvas } from "@react-three/fiber";
import Sphere from "./ui/Sphere";

const SphereTest = () => {
  return (
    <div className=" w-full h-full">
      <Canvas
        shadows
        orthographic={true}
        camera={{
          fov: 90,
          near: 0.1,
          far: 1000,
          position: [0, 0, 10],
          zoom: 30
        }}
      >
        <color attach="background" args={["lightGray"]} />
        <Sphere />
      </Canvas>
    </div>
  );
};

export default SphereTest;
