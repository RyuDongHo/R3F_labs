import getRandomNonZero from "@/Shared/lib/getRandomNonZeroFloat";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

type UseSphereMovementProps = {
  sphereRefs: React.RefObject<THREE.Group>;
  boxCenter: THREE.Vector3;
  boxSize: THREE.Vector3;
};

const useSphereMovement = (props: UseSphereMovementProps) => {
  const { sphereRefs, boxCenter, boxSize } = props;

  // 각 구체의 속도를 저장하는 ref
  const velocitiesRef = React.useRef<THREE.Vector3[]>([]);
  // 각 구체의 이펙트 타이머를 저장하는 ref
  const effectTimersRef = React.useRef<number[]>([]);
  // 각 구체의 원본 크기를 저장하는 ref
  const originalScalesRef = React.useRef<THREE.Vector3[]>([]);

  React.useEffect(() => {
    if (sphereRefs.current.children.length < 1) return;

    // 속도 배열 초기화
    velocitiesRef.current = [];
    effectTimersRef.current = [];
    originalScalesRef.current = [];

    sphereRefs.current.children.forEach((sphere, index) => {
      if (sphere instanceof THREE.Mesh) {
        // 초기 위치 설정
        const vec = new THREE.Vector3(
          THREE.MathUtils.randFloat(-5, 5),
          THREE.MathUtils.randFloat(0, 10),
          0
        );
        sphere.position.set(vec.x, vec.y, vec.z);

        // 각 구체에 랜덤한 초기 속도 부여
        velocitiesRef.current[index] = new THREE.Vector3(
          getRandomNonZero({ min: 0.5, max: 3 }),
          getRandomNonZero({ min: 0.5, max: 3 }),
          getRandomNonZero({ min: 0.5, max: 3 })
        );

        // 이펙트 타이머 초기화
        effectTimersRef.current[index] = 0;
        
        // 원본 크기 저장
        originalScalesRef.current[index] = sphere.scale.clone();
      }
    });
  }, [sphereRefs]);

  useFrame((_, delta) => {
    if (sphereRefs.current.children.length < 2 || delta > 0.1) return;

    sphereRefs.current.children.forEach((sphere, index) => {
      if (sphere instanceof THREE.Mesh && velocitiesRef.current[index]) {
        const pos = sphere.position;
        const velocity = velocitiesRef.current[index];
        const sphereSize = sphere.geometry.parameters.radius;
        const speed = 5; // 움직임 속도

        // 먼저 위치 업데이트
        const moveVec = velocity.clone().multiplyScalar(speed * delta);
        pos.add(moveVec);

        let isCrashed = false;
        // 박스 경계 체크 및 방향 전환, 위치 보정
        if (
          pos.x > boxCenter.x + boxSize.x / 2 - sphereSize / 2 ||
          pos.x < boxCenter.x - boxSize.x / 2 + sphereSize / 2
        ) {
          velocity.x = -velocity.x;
          // 경계 내부로 위치 보정
          pos.x = Math.max(
            boxCenter.x - boxSize.x / 2 + sphereSize / 2,
            Math.min(boxCenter.x + boxSize.x / 2 - sphereSize / 2, pos.x)
          );
          isCrashed = true;
        }

        if (
          pos.y > boxCenter.y + boxSize.y / 2 - sphereSize / 2 ||
          pos.y < boxCenter.y - boxSize.y / 2 + sphereSize / 2
        ) {
          velocity.y = -velocity.y;
          // 경계 내부로 위치 보정
          pos.y = Math.max(
            boxCenter.y - boxSize.y / 2 + sphereSize / 2,
            Math.min(boxCenter.y + boxSize.y / 2 - sphereSize / 2, pos.y)
          );
          isCrashed = true;
        }

        if (
          pos.z > boxCenter.z + boxSize.z / 2 - sphereSize / 2 ||
          pos.z < boxCenter.z - boxSize.z / 2 + sphereSize / 2
        ) {
          velocity.z = -velocity.z;
          // 경계 내부로 위치 보정
          pos.z = Math.max(
            boxCenter.z - boxSize.z / 2 + sphereSize / 2,
            Math.min(boxCenter.z + boxSize.z / 2 - sphereSize / 2, pos.z)
          );
          isCrashed = true;
        }

        if (isCrashed) {
          sphere.material.color = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
          );
        }
      }
    });
  });
};

export default useSphereMovement;
