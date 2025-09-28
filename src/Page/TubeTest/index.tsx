import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";

const TubeTest = (): React.ReactElement => {
  const points: THREE.Vector3[] = [];
  const count = 720;
  const amplitude = 3;
  const division = 50;
  const curveGroupPosition = new THREE.Vector3(-(count / division) / 2, 0, 0);
  for (let i = 0; i < count; i += 3) {
    const sin = Math.sin(THREE.MathUtils.degToRad(i)) * amplitude;
    const cos = Math.cos(THREE.MathUtils.degToRad(i)) * amplitude;
    points.push(new THREE.Vector3(i / division, sin, cos));
  }
  return (
    <>
      <Canvas
        camera={{
          fov: 90,
          near: 0.1,
          far: 1000,
        }}
      >
        <CameraControls />
        <color attach="background" args={["#151616"]} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.5} />
        <gridHelper args={[10, 10, `white`, `gray`]} position={[0, 0, 0]} />
        <group position={curveGroupPosition}>
          {points.map((point, index) => (
            <Billboard key={index} position={point}>
              <Text color={"red"} fontSize={0.3}>
                {index}
              </Text>
            </Billboard>
          ))}
        </group>
      </Canvas>
    </>
  );
};

export default TubeTest;
