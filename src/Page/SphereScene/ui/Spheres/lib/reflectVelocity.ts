import * as THREE from "three";

type ReflectVelocityProps = {
  velocity: THREE.Vector3;
  normal: THREE.Vector3;
};

const reflectVelocity = (props: ReflectVelocityProps): THREE.Vector3 => {
  const { velocity, normal } = props;
  // 입사 벡터와 법선의 내적
  const dot = velocity.dot(normal);
  // 반사 벡터 계산
  const reflected = velocity.clone().sub(normal.multiplyScalar(2 * dot));
  return reflected;
};

export default reflectVelocity;
