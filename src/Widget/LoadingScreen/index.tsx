import React from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  progress: number;
  onStart: () => void;
}

const LoadingScreen = ({ progress, onStart }: LoadingScreenProps): React.ReactElement | null => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = React.useState(true);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (progress === 100) {
      setIsComplete(true);
    }
  }, [progress]);

  const handleStart = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setShouldRender(false);
          onStart();
        },
      });
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Loading text */}
        <h2 className="text-4xl xl:text-6xl font-bold text-white/90 tracking-wider">
          {isComplete ? "READY" : "LOADING"}
        </h2>

        {!isComplete ? (
          <>
            {/* Progress bar */}
            <div className="w-64 xl:w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress percentage */}
            <p className="text-xl xl:text-2xl font-bold text-white/60">
              {Math.round(progress)}%
            </p>
          </>
        ) : (
          <button
            onClick={handleStart}
            className="rounded-4xl cursor-pointer mt-8 px-12 py-4 text-2xl xl:text-3xl font-bold text-black bg-white hover:bg-gray-200 transition-colors duration-300 tracking-wider"
          >
            LET's Journey
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
