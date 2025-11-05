import React from "react";
import { useGsapEffect } from "./model/useGsapEffect";

interface LoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  const { progress, onComplete } = props;
  const [isAnimationEnd, setIsAnimationEnd] = React.useState(false);
  const {
    preloaderRef,
    headerRef,
    copyRef,
    imagesRef,
    imageRefs,
    endLoadingAnimation,
  } = useGsapEffect({
    onComplete: () => {
      onComplete();
      setIsAnimationEnd(true);
    },
  });

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

  if (isAnimationEnd) {
    return null;
  }
  return (
    <div>
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 w-full h-screen bg-black overflow-hidden z-50"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        {/* Progress Bar */}
        <div
          className="absolute top-0 left-0 w-full h-[7px] bg-white origin-left"
          style={{ width: `${progress}%` }}
        />

        {/* Images Container */}
        <div
          ref={imagesRef}
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10rem] h-[10rem] overflow-hidden md:w-[30rem] md:h-[30rem] md:top-[35%]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover scale-[2]"
              />
            </div>
          ))}
        </div>

        {/* Preloader Header */}
        <div className="w-full flex justify-center items-center translate-y-[60vh] md:translate-y-[70vh]">
          <button
            ref={headerRef}
            className="cursor-pointer text-white font-['Agdasima',_sans-serif] text-[1.5rem] lg:text-[4rem] font-semibold leading-[0.9] tracking-wider uppercase whitespace-nowrap p-0 bg-transparent border-0 transition-colors duration-300 hover:text-cyan-300"
            style={{ opacity: `${progress}%` }}
            onClick={() => {
              if (progress >= 100) {
                endLoadingAnimation();
              }
            }}
          >
            Click To Journey
          </button>
        </div>

        {/* Copy Text */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[30%] text-white md:w-[80%]">
          <p
            ref={copyRef}
            className="uppercase text-center text-[0.8rem] font-medium leading-relaxed"
          >
            Crafting pixel-perfect experiences where code meets creativity and
            design becomes interactive art
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
