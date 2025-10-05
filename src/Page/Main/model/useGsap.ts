import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseGsapProps = {
  curveSceneRef: React.RefObject<HTMLDivElement>;
  featuresRef: React.RefObject<HTMLDivElement>;
};

const useGsap = (props: UseGsapProps): void => {
  const { curveSceneRef, featuresRef } = props;

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // CurveScene 애니메이션: 나타났다가 사라지기
      gsap
        .timeline({
          scrollTrigger: {
            trigger: curveSceneRef.current,
            scrub: 1,
            end: "top 30%",
          },
        })
        .fromTo(curveSceneRef.current, { opacity: 0 }, { opacity: 1 });

      // Features 하나씩 나타나기
      gsap.fromTo(
        ".feature-item",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [curveSceneRef, featuresRef]);
};

export default useGsap;
