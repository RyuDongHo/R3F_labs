import React from "react";
import useAboutMeModalStore from "@/Shared/zustand/useAboutMeModalStore";
import useGsapEffect from "./model/useGsapEffect";
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiStyledcomponents,
  SiWebgl 
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

const AboutMeModal = (): React.ReactElement => {
  const { isOpen, closeModal } = useAboutMeModalStore();

  // Animation effect (ref managed inside hook)
  const modalRef = useGsapEffect({
    isOpen,
  });

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center z-50 opacity-0"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 모달 내용 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Creative Developer
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Crafting Digital Experiences
            </p>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              Transforming the web into more than just information delivery—into{" "}
              <span className="text-cyan-500 font-semibold">
                living, breathing experiences
              </span>
              .
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">✨</span>
                What I Believe
              </h3>
              <p className="leading-relaxed">
                Code is art, and interaction is conversation. I build immersive digital worlds 
                through 3D graphics and smooth animations, ensuring users don't just 'see' 
                websites—they 'experience' them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🛠️</span>
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <SiReact className="text-cyan-500" size={20} />
                    React & R3F
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    React Three Fiber for 3D rendering
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <TbBrandThreejs className="text-white" size={20} />
                    Three.js
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    WebGL 3D library
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <SiTypescript className="text-blue-600" size={20} />
                    TypeScript
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Type-safe JavaScript
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <SiJavascript className="text-yellow-500" size={20} />
                    JavaScript
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Modern ES6+
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <SiTailwindcss className="text-cyan-400" size={20} />
                    Tailwind CSS
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Utility-first CSS
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <SiStyledcomponents className="text-pink-400" size={20} />
                    Styled Components
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    CSS-in-JS styling
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors col-span-2">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <SiWebgl className="text-red-500" size={20} />
                    OpenGL & WebGL
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    High-performance graphics rendering
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-2">
              <p className="text-lg italic text-gray-600 dark:text-gray-400">
                "Every pixel has a purpose, every animation tells a story."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeModal;
