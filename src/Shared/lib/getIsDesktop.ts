const getIsDesktop: () => [boolean] = () => {
  if (typeof window === "undefined") return [true]; // 서버 사이드 렌더링 시 기본값
  return [window.innerWidth >= 1024]; // 1024px 이상이면 데스크톱으로 간주
};
export default getIsDesktop;
