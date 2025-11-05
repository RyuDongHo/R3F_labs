import gsap from "gsap";
import React from "react";

type UseGsapEffectProps = {
  isOpen: boolean;
};

const useGsapEffect = (
  props: UseGsapEffectProps
): React.RefObject<HTMLDivElement> => {
  const { isOpen } = props;
  const modalRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // 모달 열기 애니메이션
      gsap.killTweensOf(modalRef.current);
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      // 모달 닫기 애니메이션
      gsap.killTweensOf(modalRef.current);
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return modalRef;
};

export default useGsapEffect;
