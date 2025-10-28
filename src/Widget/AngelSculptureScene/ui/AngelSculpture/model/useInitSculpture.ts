import type { ObjectMap } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

type UseInitSculptureProps = {
  angelSculpture: GLTF & ObjectMap;
};

const useInitSculpture = (props: UseInitSculptureProps): void => {
  const { angelSculpture } = props;
  React.useEffect(() => {
    if (!angelSculpture || !angelSculpture.scene) return;
    angelSculpture.scene.traverse((child: THREE.Object3D) => {
      // narrow to Mesh using instanceof (no `any` needed)
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.Material | null;
        // detect MeshBasicMaterial by checking the runtime flag
        if (mat && (mat as THREE.MeshBasicMaterial).isMeshBasicMaterial) {
          const basic = mat as THREE.MeshBasicMaterial;
          const newMat = new THREE.MeshStandardMaterial({
            map: basic.map || null,
            color: basic.color
              ? basic.color.clone()
              : new THREE.Color(0xffffff),
            metalness: 0.1,
            roughness: 0.8,
          });
          mesh.material = newMat;
        }
      }
    });
  }, [angelSculpture]);
};

export default useInitSculpture;
