import getIsDesktop from "@/Shared/lib/getIsDesktop";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";

const useCameraMovement = () => {
  const [isDeskTop] = getIsDesktop();

  // base positions (keep in refs so lint won't complain)
  const baseTarget = React.useRef<[number, number, number]>([0.5, 1.5, 0]);
  
  // 데스크탑: 원래 위치
  // 모바일: 더 뒤로, 더 위에서 전체 조각상 보이도록
  const baseCamera = React.useRef<[number, number, number]>(
    isDeskTop ? [0.6, 1.9, 0.71] : [0.6, 2.2, 1.5]
  );

  const { camera } = useThree();

  React.useEffect(() => {
    // ensure initial camera position (use ref values)
    const [bx, by, bz] = baseCamera.current;
    const [tx, ty, tz] = baseTarget.current;
    camera.position.set(bx, by, bz);
    camera.lookAt(tx, ty, tz);
  }, [camera]);

  useFrame((state, delta) => {
    // subtle camera follow based on pointer, stays near base positions
    const px = state.pointer.x; // -1 .. 1
    const py = state.pointer.y; // -1 .. 1

    // tweak these to control max offset (kept small so camera stays near base)
    const maxCamOffsetX = 0.12; // left-right camera shift
    const maxCamOffsetY = 0.08; // up-down camera shift

    const [bx, by, bz] = baseCamera.current;

    const desiredCamX = bx + px * maxCamOffsetX;
    const desiredCamY = by + py * maxCamOffsetY;
    const desiredCamZ = bz;

    // simple lerp smoothing
    const lerpFactor = 1 - Math.exp(-6 * delta); // responsive but smooth

    camera.position.x += (desiredCamX - camera.position.x) * lerpFactor;
    camera.position.y += (desiredCamY - camera.position.y) * lerpFactor;
    camera.position.z += (desiredCamZ - camera.position.z) * lerpFactor;
  });
};
export default useCameraMovement;
