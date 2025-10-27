import React from "react";
import useGsapEffect from "./model/useGsapEffect";

const MENU_ITEMS = [
  "ABOUT ME",
  "CONTACT",
  "PROJECTS",
  "DESIGN",
  "COLLECTIVE",
  "FEATURES",
  "ATRIUM",
];

const SideNav = (): React.ReactElement => {
  const fillRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [handleMouseEnter, handleMouseLeave] = useGsapEffect({ fillRefs });

  return (
    <nav className="fixed right-4 xl:right-16 top-1/2 -translate-y-1/2">
      <ul className="flex flex-col gap-1 xl:gap-2">
        {MENU_ITEMS.map((item, index) => (
          <li
            key={`${item}-${index}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onTouchStart={() => handleMouseEnter(index)}
            onTouchEnd={() => handleMouseLeave(index)}
            className="cursor-pointer group"
          >
            <div className="relative py-1">
              {/* Base text (gray) */}
              <span className="block text-2xl xl:text-6xl font-bold overflow-hidden text-gray-600/40 tracking-wider">
                {item}
              </span>

              {/* Fill text (white) - positioned absolutely */}
              <div
                ref={(el) => {
                  fillRefs.current[index] = el;
                }}
                className="absolute top-0 left-0 w-0 h-full overflow-hidden"
              >
                <span className="block text-2xl xl:text-6xl font-bold text-white tracking-wider whitespace-nowrap py-1">
                  {item}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
