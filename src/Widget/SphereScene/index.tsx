import { Canvas } from "@react-three/fiber";
import Spheres from "./ui/Spheres";
import getGoldenCameraPosition from "../../Shared/lib/getGoldenCameraPosition";
import React from "react";
import useColorPalette from "./model/useColorPalette";
import * as THREE from "three";
import getIsDesktop from "@/Shared/lib/getIsDesktop";
import useClickSound from "./model/useClickSound";

type SphereSceneProps = {
  position?: THREE.Vector3;
  distanceFromCenter?: number;
};
const SphereScene = (props: SphereSceneProps): React.ReactElement => {
  const { position = new THREE.Vector3(0, 0, 0), distanceFromCenter = 10 } = props;
  // 황금비율 기반 카메라 포지션 설정
  const cameraPosition = getGoldenCameraPosition({ baseDistance: distanceFromCenter });
  // 마우스 오버 상태
  const [isPointerEnter, setIsPointerEnter] = React.useState<boolean>(false);
  // 색상 팔레트
  const [colorPalette, changeColorPalette] = useColorPalette();
  // 클릭 사운드
  const playClickSound = useClickSound();

  const isDesktop = getIsDesktop();
  return (
    <>
      <Canvas
        className="cursor-pointer"
        onPointerEnter={() => setIsPointerEnter(true)}
        onPointerLeave={() => setIsPointerEnter(false)}
        onClick={() => {
          changeColorPalette();
          playClickSound();
        }}
        shadows
        camera={{
          fov: 90,
          near: 0.1,
          far: 1000,
          position: cameraPosition,
        }}
      >
        <color attach="background" args={["black"]} />
        <Spheres
          isPointerEnter={isPointerEnter}
          sphereCount={isDesktop ? 60 : 30}
          colorPalette={colorPalette}
          boxSize={
            isDesktop
              ? new THREE.Vector3(25, 25, 27)
              : new THREE.Vector3(20, 20, 20)
          }
          center={isDesktop && new THREE.Vector3(-3, 0, -2)}
          boxWireFrame={false}
          position={position}
        />
      </Canvas>
    </>
  );
};

export default SphereScene;
