import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

/**
 * Canvas 배경색을 천천히 변화시키는 커스텀 훅
 */
const useAnimatedBackground = () => {
  const [currentColor, setCurrentColor] = React.useState<string>("#0a0a0a");
  const colorRef = React.useRef<THREE.Color>(new THREE.Color("#0a0a0a"));
  const targetColorRef = React.useRef<THREE.Color>(new THREE.Color("#0a0a0a"));
  const timeRef = React.useRef<number>(0);

  // 배경색 후보들 (매우 어두운 톤들)
  const backgroundColors = React.useMemo(() => [
    "#0a0a0a", // 매우 어두운 회색
    "#0d0d1f", // 매우 어두운 남색
    "#0b1125", // 매우 어두운 파랑
    "#101010", // 매우 어두운 회색
    "#1a0f0f", // 매우 어두운 갈색
    "#0f1419", // 매우 어두운 청록색
  ], []);

  React.useEffect(() => {
    // 초기 타겟 색상 설정
    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    targetColorRef.current.set(randomColor);
  }, [backgroundColors]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // 3초마다 새로운 타겟 색상 선택
    if (timeRef.current > 3) {
      const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      targetColorRef.current.set(randomColor);
      timeRef.current = 0;
    }

    // 현재 색상을 타겟 색상으로 천천히 lerp
    colorRef.current.lerp(targetColorRef.current, delta * 0.5);
    
    // 상태 업데이트로 리렌더링 트리거
    const hexColor = `#${colorRef.current.getHexString()}`;
    setCurrentColor(hexColor);
  });

  return currentColor;
};

export default useAnimatedBackground;