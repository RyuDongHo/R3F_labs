const getGoldenCameraPosition = (): [number, number, number] => {
  const phi = 1.618; // 황금비율
  const baseDistance = 8; // 기본 거리 (10 -> 8로 감소)

  if (typeof window !== "undefined") {
    // 모바일 (768px 미만) - 더 멀리, 황금비율 적용
    if (window.innerWidth < 768) {
      return [
        baseDistance * phi * 1.0, // x: 12.94
        baseDistance * phi * 0.8, // y: 10.35
        baseDistance * phi * 0.7, // z: 9.06
      ];
    }
    // 태블릿 (768px ~ 1024px) - 중간 거리
    else if (window.innerWidth < 1024) {
      return [
        baseDistance * phi * 0.8, // x: 10.35
        baseDistance * phi * 0.7, // y: 9.06
        baseDistance * phi * 0.6, // z: 7.77
      ];
    }
  }
  // 데스크톱 (1024px 이상) - 황금비율의 아름다운 균형
  return [
    baseDistance * phi * 0.6, // x: 7.77
    baseDistance * phi * 0.8, // y: 10.35
    baseDistance * phi * 0.5, // z: 6.47
  ];
};

export default getGoldenCameraPosition;
