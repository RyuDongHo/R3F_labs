import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

/**
 * Canvas 배경색을 천천히 변화시키는 커스텀 훅
 */
const useAnimatedBackground = () => {
  const [currentColor, setCurrentColor] = React.useState<string>("#151616");
  const colorRef = React.useRef<THREE.Color>(new THREE.Color("#151616"));
  const targetColorRef = React.useRef<THREE.Color>(new THREE.Color("#151616"));
  const timeRef = React.useRef<number>(0);

  // 배경색 후보들 (어두운 톤들)
  const backgroundColors = React.useMemo(() => [
    "#151616", // 원래 색상 (어두운 회색)
    "#1a1a2e", // 어두운 남색
    "#16213e", // 어두운 파랑
    "#1e1e1e", // 어두운 회색
    "#2d1b1b", // 어두운 갈색
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