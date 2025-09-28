import getRandomNonZero from "@/Shared/lib/getRandomNonZeroFloat";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import reflectVelocity from "../lib/reflectVelocity";

type UseSphereMovementProps = {
  sphereRefs: React.RefObject<THREE.Group>;
  boxCenter: THREE.Vector3;
  boxSize: THREE.Vector3;
};

const useSphereMovement = (props: UseSphereMovementProps) => {
  const { sphereRefs, boxCenter, boxSize } = props;

  // 각 구체의 속도를 저장하는 ref
  const velocitiesRef = React.useRef<THREE.Vector3[]>([]);
  // 움직임 속도
  const speed = 1.5;

  React.useEffect(() => {
    if (sphereRefs.current.children.length < 1) return;
    // 속도 배열 초기화
    velocitiesRef.current = [];
    // 구체 초기값 설정 (크기, 속도)
    sphereRefs.current.children.forEach((sphere, index) => {
      if (sphere instanceof THREE.Mesh) {
        // 크기 랜덤 설정
        sphere.scale.setScalar(THREE.MathUtils.randFloat(1, 1.5));
        // 각 구체에 랜덤한 초기 속도 부여
        velocitiesRef.current[index] = new THREE.Vector3(
          getRandomNonZero({ min: 0.5, max: 3 }),
          getRandomNonZero({ min: 0.5, max: 3 }),
          getRandomNonZero({ min: 0.5, max: 3 })
        ).normalize();
      }
    });
  }, [sphereRefs]);

  useFrame((_, delta) => {
    if (sphereRefs.current.children.length < 2 || delta > 0.1) return;

    sphereRefs.current.children.forEach((sphere, index) => {
      if (sphere instanceof THREE.Mesh && velocitiesRef.current[index]) {
        const pos = sphere.position;
        const velocity = velocitiesRef.current[index];
        const sphereSize = sphere.geometry.parameters.radius * sphere.scale.x;
        // velocity의 크기가 너무 커지지 않도록 제한
        if (velocity.length() < 10) {
          velocity.multiplyScalar(1.02);
        }

        // 위치 업데이트
        const moveVec = velocity.clone().multiplyScalar(delta * speed);
        pos.add(moveVec);

        let isCrashed = false;
        // 박스 경계 체크 및 방향 전환, 위치 보정
        if (
          pos.x >= boxCenter.x + boxSize.x / 2 - sphereSize / 2 ||
          pos.x <= boxCenter.x - boxSize.x / 2 + sphereSize / 2
        ) {
          // 경계 내부로 위치 보정
          pos.x = Math.max(
            boxCenter.x - boxSize.x / 2 + sphereSize / 2,
            Math.min(boxCenter.x + boxSize.x / 2 - sphereSize / 2, pos.x)
          );
          const wallNormal = new THREE.Vector3(pos.x > 0 ? -1 : 1, 0, 0); // 왼쪽 벽의 법선
          velocity.copy(reflectVelocity({ velocity, normal: wallNormal }));
          isCrashed = true;
        }
        if (
          pos.y >= boxCenter.y + boxSize.y / 2 - sphereSize / 2 ||
          pos.y <= boxCenter.y - boxSize.y / 2 + sphereSize / 2
        ) {
          // 경계 내부로 위치 보정
          pos.y = Math.max(
            boxCenter.y - boxSize.y / 2 + sphereSize / 2,
            Math.min(boxCenter.y + boxSize.y / 2 - sphereSize / 2, pos.y)
          );
          const wallNormal = new THREE.Vector3(0, pos.y > 0 ? -1 : 1, 0); // 아래 벽의 법선
          velocity.copy(reflectVelocity({ velocity, normal: wallNormal }));
          isCrashed = true;
        }
        if (
          pos.z >= boxCenter.z + boxSize.z / 2 - sphereSize / 2 ||
          pos.z <= boxCenter.z - boxSize.z / 2 + sphereSize / 2
        ) {
          // 경계 내부로 위치 보정
          pos.z = Math.max(
            boxCenter.z - boxSize.z / 2 + sphereSize / 2,
            Math.min(boxCenter.z + boxSize.z / 2 - sphereSize / 2, pos.z)
          );
          const wallNormal = new THREE.Vector3(0, 0, pos.z > 0 ? -1 : 1); // 앞쪽 벽의 법선
          velocity.copy(reflectVelocity({ velocity, normal: wallNormal }));
          isCrashed = true;
        }
        if (isCrashed) {
          sphere.material.color = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
          );
        }

        // 다른 구체와의 충돌 검사
        for (let i = 1 + index; i < sphereRefs.current.children.length; i++) {
          const otherSphere = sphereRefs.current.children[i];
          if (otherSphere instanceof THREE.Mesh) {
            const otherRadius =
              otherSphere.geometry.parameters.radius * otherSphere.scale.x;
            const dis = sphere.position.distanceTo(otherSphere.position);

            if (dis < sphereSize + otherRadius) {
              // 충돌시 접점 기준 반대 방향으로 벡터 설정
              const collisionNormal = new THREE.Vector3()
                .subVectors(sphere.position, otherSphere.position)
                .normalize();
              const collisionMoveVec = collisionNormal
                .clone()
                .multiplyScalar(speed);

              // 속도 벡터 반전
              velocity.set(
                collisionMoveVec.x,
                collisionMoveVec.y,
                collisionMoveVec.z
              );
              // 충돌한 구체도 반대 방향으로 속도 벡터 반전
              velocitiesRef.current[i].set(
                -1 * collisionMoveVec.x,
                -1 * collisionMoveVec.y,
                -1 * collisionMoveVec.z
              );

              // 충돌한 구체 위치 보정
              const overlap = sphereSize + otherRadius - dis;
              sphere.position.add(
                collisionNormal.clone().multiplyScalar(overlap)
              );
            }
          }
        }
      }
    });
  });
};

export default useSphereMovement;
