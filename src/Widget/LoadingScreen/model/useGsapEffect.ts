import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, SplitText);

type UseGsapEffectProps = {
  onComplete: () => void;
};

export const useGsapEffect = (props: UseGsapEffectProps) => {
  const { onComplete } = props;
  const preloaderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!headerRef.current || !copyRef.current) return;

    // Custom ease 생성
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    // 타임라인 생성
    const tl = gsap.timeline({
      delay: 0.25,
    });

    // 변수 선언 (SplitText.create에서 사용)
    let splitHeader: SplitText | null = null;
    let splitCopy: SplitText | null = null;
    let chars: Element[] = [];
    let lines: Element[] = [];

    // Header 텍스트 분리 및 초기 애니메이션 설정
    splitHeader = SplitText.create(headerRef.current, {
      type: "chars",
      onSplit: (self) => {
        chars = self.chars || [];

        // 초기 상태 설정
        chars.forEach((char, index) => {
          gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
        });
      },
    });

    // Copy 텍스트 분리 및 초기 애니메이션 설정
    splitCopy = SplitText.create(copyRef.current, {
      type: "lines",
      onSplit: (self) => {
        lines = self.lines || [];
        gsap.set(lines, { yPercent: 100 });
      },
    });

    // 타임라인 길이 유지를 위한 더미 애니메이션 (5초)
    tl.to({}, { duration: 5 });

    // 2. 이미지 순차 공개
    imageRefs.current.forEach((imgWrapper, index) => {
      if (!imgWrapper) return;

      const img = imgWrapper.querySelector("img");

      tl.to(
        imgWrapper,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          duration: 1,
          ease: "hop",
          delay: index * 0.75,
        },
        "-=5"
      );

      if (img) {
        tl.to(
          img,
          {
            scale: 1,
            duration: 1.5,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5.25"
        );
      }
    });

    // 3. 텍스트 등장
    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=5.5"
    );

    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
      },
      "-=5"
    );

    // 4. 이미지 컨테이너 사라짐
    tl.to(
      imagesRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      },
      "-=1.5"
    );

    // 5. 텍스트 재배치
    tl.to(
      lines,
      {
        y: "-125%",
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=2"
    );

    // chars 재배치
    tl.to(
      chars,
      {
        yPercent: -35,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
        delay: 0.5,
      },
      "-=2.5"
    );


    // Cleanup
    return () => {
      tl.kill();
      splitHeader?.revert();
      splitCopy?.revert();
    };
  }, []);

  const endLoadingAnimation = () => {
    if (preloaderRef.current) {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          onComplete();
        },
      });
    }
  };

  return {
    preloaderRef,
    headerRef,
    copyRef,
    imagesRef,
    imageRefs,
    endLoadingAnimation,
  };
};
