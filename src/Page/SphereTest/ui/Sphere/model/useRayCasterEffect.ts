import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type UseRayCasterEffectProps = {
  sphereGroupRef: React.RefObject<THREE.Group>;
  center: THREE.Vector3;
  size: THREE.Vector3;
  repelRadius: number;
  repelStrength: number;
};

const useRayCasterEffect = (props: UseRayCasterEffectProps) => {
  const { sphereGroupRef, center, size, repelRadius, repelStrength } = props;
  const { pointer, camera, raycaster } = useThree();
  useFrame((_, delta) => {
    raycaster.setFromCamera(pointer, camera);
    if (!sphereGroupRef.current) return;

    // 광선 정보 가져오기
    const rayOrigin = raycaster.ray.origin;
    const rayDirection = raycaster.ray.direction;
    // rayOrigin: 광선의 시작점 (3D 좌표, 보통 카메라 위치)
    // rayDirection: 광선의 방향 (정규화된 벡터, 크기가 1)

    // 마우스 주변 구체 밀어내기 (광선과의 거리 기반)
    for (const child of sphereGroupRef.current.children) {
      if (!(child instanceof THREE.Mesh)) continue;
      const sphere = child as THREE.Mesh;
      const pos = sphere.position;

      // 구체 위치에서 광선까지의 최단 거리 계산
      const toSphere = pos.clone().sub(rayOrigin);
      const projectionLength = toSphere.dot(rayDirection);
      const closestPointOnRay = rayOrigin
        .clone()
        .add(
          rayDirection.clone().multiplyScalar(Math.max(0, projectionLength))
        );

      const distanceToRay = pos.distanceTo(closestPointOnRay);

      if (distanceToRay < repelRadius) {
        // 광선에서 구체로의 방향 벡터 (밀어낼 방향)
        const pushDirection = pos.clone().sub(closestPointOnRay).normalize();
        const falloff = Math.max(0, 1 - distanceToRay / repelRadius); // 선형 감쇠
        const push = pushDirection.multiplyScalar(
          falloff * repelStrength * delta
        );
        pos.add(push);

        // 경계 내로 클램프 (구 반지름 고려)
        const radius =
          ((sphere.geometry as THREE.SphereGeometry).parameters.radius ?? 0.8) *
          sphere.scale.x;
        pos.x = Math.max(
          center.x - size.x / 2 + radius,
          Math.min(center.x + size.x / 2 - radius, pos.x)
        );
        pos.y = Math.max(
          center.y - size.y / 2 + radius,
          Math.min(center.y + size.y / 2 - radius, pos.y)
        );
        pos.z = Math.max(
          center.z - size.z / 2 + radius,
          Math.min(center.z + size.z / 2 - radius, pos.z)
        );
      }
    }
  });
};

export default useRayCasterEffect;
