import getIsDesktop from "@/Shared/lib/getIsDesktop";
import { useFrame, type ObjectMap } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

type UseLightMovementProps = {
  lightRef: React.RefObject<THREE.PointLight>;
  angelSculpture: GLTF & ObjectMap;
};

const useLightMovement = (props: UseLightMovementProps): void => {
  const { lightRef, angelSculpture } = props;
  const [isDesktop] = getIsDesktop();
  const lightDistance = isDesktop ? 0.5 : 0.2;
  useFrame((state, delta) => {
    // move the point light toward intersection (if available)
    if (lightRef.current && angelSculpture && angelSculpture.scene) {
      const targetPos = new THREE.Vector3();
      const worldPointer = new THREE.Vector3(
        state.pointer.x,
        state.pointer.y,
        lightDistance
      ).unproject(state.camera);
      targetPos.copy(state.camera.position).lerp(worldPointer, 0.6);
      // smooth light movement
      lightRef.current.position.lerp(targetPos, 1 - Math.exp(-8 * delta));
      const dist = lightRef.current.position.distanceTo(state.camera.position);
      lightRef.current.intensity = THREE.MathUtils.clamp(
        1.5 - dist * 0.12,
        0.2,
        2.0
      );
    }
  });
};
export default useLightMovement;
