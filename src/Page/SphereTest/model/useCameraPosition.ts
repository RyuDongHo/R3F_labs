const useCameraPosition = (): [number, number, number] => {
  const phi = 1.618; // 황금비율
  const baseDistance = 10; // 기본 거리

  if (typeof window !== "undefined") {
    // 모바일 (768px 미만) - 더 멀리, 황금비율 적용
    if (window.innerWidth < 768) {
      return [
        baseDistance * phi * 1.2, // x: 19.4
        baseDistance * phi, // y: 16.18
        baseDistance * phi * 0.8, // z: 12.94
      ];
    }
    // 태블릿 (768px ~ 1024px) - 중간 거리
    else if (window.innerWidth < 1024) {
      return [
        baseDistance * phi, // x: 16.18
        baseDistance * phi * 0.9, // y: 14.56
        baseDistance * phi * 0.7, // z: 11.33
      ];
    }
  }
  // 데스크톱 (1024px 이상) - 황금비율의 아름다운 균형
  return [
    baseDistance * phi * 0.8, // x: 12.94
    baseDistance * phi, // y: 16.18
    baseDistance * phi * 0.6, // z: 9.71
  ];
};

export default useCameraPosition;
