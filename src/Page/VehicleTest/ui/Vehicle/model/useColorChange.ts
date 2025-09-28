import type { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

type UseColorChangeProps = {
  objects: GLTF; // GLTF는 scene 프로퍼티를 가지고 있음
  cameraControlsRef: React.RefObject<CameraControls>;
};
const useColorChange = (props: UseColorChangeProps): [() => void] => {
  const { objects, cameraControlsRef } = props;
  const { raycaster, pointer, camera } = useThree();
  const colorChangeClickHandler = () => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(objects.scene.children, true);

    if (intersects.length > 0) {
      console.log(intersects[0].object);
      const obj = intersects[0].object as THREE.Mesh;
      const material = obj.material as THREE.MeshStandardMaterial;
      const clonedMaterial = material.clone();
      clonedMaterial.color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      obj.material = clonedMaterial;

      cameraControlsRef.current.fitToBox(obj, true);
      // cameraControlsRef.current.setLookAt(
      //   5,
      //   5,
      //   5,
      //   obj.position.x,
      //   obj.position.y,
      //   obj.position.z,
      //   true
      // );
    }
  };

  return [colorChangeClickHandler];
};

export default useColorChange;
