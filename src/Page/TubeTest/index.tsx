import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const TubeTest = (): React.ReactElement => {

  const points: THREE.Vector3[] = [];
  const count = 360;
  const amplitude = 10;
  const division = 15;

  for(let i = 0; i < count; i++) {
    const x =  i / division;
    const sin = Math.sin(THREE.MathUtils.degToRad(i)) * amplitude;
    const cos = Math.cos(THREE.MathUtils.degToRad(i)) * amplitude;
    points.push(new THREE.Vector3(x - (count / division / 2), sin, 0));
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
        {
          points.map((point, index) => (
            <mesh key={index} position={point}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          ))
        }
      </Canvas>
    </>
  );
};

export default TubeTest;
