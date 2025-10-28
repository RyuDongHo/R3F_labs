import React from "react";
import SideNav from "@/Widget/SideNav";
import LoadingScreen from "@/Widget/LoadingScreen";
import { useProgress } from "@react-three/drei";
import useMusicStore from "@/Shared/zustand/useMusicStore";
import AngelSculptureScene from "@/Widget/AngelSculptureScene";
import SphereScene from "@/Widget/SphereScene";
import CurveScene from "@/Widget/CurveScene";
import useHorizontalScroll from "./model/useHorizontalScroll";
import getIsDesktop from "@/Shared/lib/getIsDesktop";

const Welcome = (): React.ReactElement => {
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const { progress } = useProgress();
  const { toggleMusic } = useMusicStore();
  const [scrollToSection] = useHorizontalScroll({ containerRef });
  const [isDesktop] = getIsDesktop();


  return (
    <main className="w-full h-full relative overflow-hidden">
      <LoadingScreen progress={progress} onStart={toggleMusic} />

      {/* 가로 스크롤 컨테이너 */}
      <div
        ref={containerRef}
        className="flex h-full overflow-x-hidden overflow-y-hidden"
      >
        {/* Section 1: Angel Scene */}
        <section id="angel" className="w-screen h-full flex-shrink-0">
          <AngelSculptureScene />
        </section>

        {/* Section 2: Sphere Scene */}
        <section id="sphere" className="w-screen h-full flex-shrink-0">
          <SphereScene distanceFromCenter={isDesktop ? 11 : 12} />
        </section>

        {/* Section 3: Curve Scene */}
        <section id="curves" className="w-screen h-full flex-shrink-0">
          <CurveScene />
        </section>
      </div>

      <SideNav
        menu={[
          ["ABOUT ME", () => {}],
          ["PROJECTS", () => {}],
          [
            "ANGEL LABs",
            () => {
              scrollToSection(0);
            },
          ],
          [
            "SPHERE LABs",
            () => {
              scrollToSection(1);
            },
          ],
          [
            "CURVE LABs",
            () => {
              scrollToSection(2);
            },
          ],
        ]}
      />
    </main>
  );
};

export default Welcome;
