import { Canvas } from "@react-three/fiber";
import Vehicle from "./ui/Vehicle";

const VehicleScene = (): React.ReactElement => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ fov: 90, position: [5, 5, 5], near: 0.1, far: 1000 }}
      >
        <color attach="background" args={["green"]} />
        <Vehicle />
      </Canvas>
    </div>
  );
};
export default VehicleScene;
