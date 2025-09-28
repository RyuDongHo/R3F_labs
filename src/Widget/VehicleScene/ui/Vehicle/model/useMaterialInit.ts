import { useEffect } from "react";
import * as THREE from "three";

type UseMaterialInitProps = {
  GLTFRef: React.RefObject<THREE.Group>;
};

const useMaterialInit = (props: UseMaterialInitProps): void => {
  const { GLTFRef } = props;
  useEffect(() => {
    GLTFRef.current.children.forEach((child) => {
      // child가 Mesh라면 metalness 수정
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material;
        if ("metalness" in material) {
          material.metalness = 0.2;
        }
        if ("castShadow" in mesh) {
          mesh.castShadow = true;
          
        }
      }
      // child가 Group/Object3D라면 내부 mesh 모두 metalness 수정
      else if (
        (child as THREE.Group).isGroup ||
        child.type === "Group" ||
        child.type === "Object3D"
      ) {
        (child as THREE.Group).traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            const material = mesh.material;
            if ("metalness" in material) {
              material.metalness = 0.2;
            }
            if ("castShadow" in mesh) {
              mesh.castShadow = true;
            }
          }
        });
      }
    });
  }, [GLTFRef]);
};

export default useMaterialInit;
