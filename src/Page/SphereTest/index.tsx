import { Canvas } from "@react-three/fiber";
import Sphere from "./ui/Sphere";

const SphereTest = () => {
  return (
    <div className=" w-full h-full">
      <Canvas
        shadows
        orthographic={true}
        camera={{ fov: 90, zoom: 70, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={["lightGray"]} />
        <gridHelper
          args={[100, 100]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Sphere />
      </Canvas>
    </div>
  );
};

export default SphereTest;
