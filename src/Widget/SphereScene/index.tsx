import { Canvas } from "@react-three/fiber";
import Spheres from "./ui/Spheres";
import getGoldenCameraPosition from "../../Shared/lib/getGoldenCameraPosition";
import React from "react";
import useColorPalette from "./model/useColorPalette";
import * as THREE from "three";
import getIsDesktop from "@/Shared/lib/getIsDesktop";
import useClickSound from "./model/useClickSound";

type SphereSceneProps = {
  withCanvas?: boolean;
};
const SphereScene = (props: SphereSceneProps): React.ReactElement => {
  const { withCanvas = true } = props;
  // 황금비율 기반 카메라 포지션 설정
  const cameraPosistion = getGoldenCameraPosition();
  // 마우스 오버 상태
  const [isPointerEnter, setIsPointerEnter] = React.useState<boolean>(false);
  // 색상 팔레트
  const [colorPalette, changeColorPalette] = useColorPalette();
  // 클릭 사운드
  const playClickSound = useClickSound();

  const isDesktop = getIsDesktop();
  return (
    <>
      {withCanvas ? (
        <Canvas
          className="rounded-2xl cursor-pointer"
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
            position: cameraPosistion,
          }}
        >
          <color attach="background" args={["#151616"]} />
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
          />
        </Canvas>
      ) : (
        <div
          className="w-full h-[calc(86%-128px)] rounded-2xl cursor-pointer"
          onPointerEnter={() => setIsPointerEnter(true)}
          onPointerLeave={() => setIsPointerEnter(false)}
          onClick={() => {
            changeColorPalette();
            playClickSound();
          }}
        >
          <color attach="background" args={["#151616"]} />
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
          />
        </div>
      )}
    </>
  );
};

export default SphereScene;
