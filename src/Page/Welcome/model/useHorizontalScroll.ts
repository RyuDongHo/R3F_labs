import React from "react";
import gsap from "gsap";

type UseHorizontalScrollProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const useHorizontalScroll = (props: UseHorizontalScrollProps) => {
  const { containerRef } = props;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 기본 스크롤 막기
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    container.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", preventScroll);
    };
  }, [containerRef]);

  const scrollToSection = React.useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const targetX = index * window.innerWidth;
      
      gsap.killTweensOf(container);
      
      // 스크롤 이동
      gsap.to(container, {
        scrollLeft: targetX,
        duration: 1.2,
        ease: "power3.inOut",
      });
    },
    [containerRef]
  );

  return [scrollToSection];
};

export default useHorizontalScroll;
