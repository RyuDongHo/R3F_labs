import gsap from "gsap";
import React from "react";

type UseGsapEffectProps = {
  fillRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

const useGsapEffect = (
  props: UseGsapEffectProps
): [
  handleMouseEnter: (index: number) => void,
  handleMouseLeave: (index: number) => void
] => {
  const { fillRefs } = props;

  const handleMouseEnter = (index: number): void => {
    if (!fillRefs.current || !fillRefs.current[index]) {
      return;
    }
    const target = fillRefs.current[index];

    gsap.killTweensOf(target);
    gsap.to(target, {
      width: "100%",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number): void => {
    if (!fillRefs.current || !fillRefs.current[index]) return;
    const target = fillRefs.current[index];

    gsap.killTweensOf(target);
    gsap.to(target, {
      width: "0%",
      duration: 0.4,
      ease: "power2.in",
    });
  };

  return [handleMouseEnter, handleMouseLeave];
};

export default useGsapEffect;
