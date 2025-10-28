import React from "react";
import useGsapEffect from "./model/useGsapEffect";

type SideNavProps = {
  menu: [string, () => void][];
};
const SideNav = (props: SideNavProps): React.ReactElement => {
  const {menu} = props;
  const fillRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [handleMouseEnter, handleMouseLeave] = useGsapEffect({ fillRefs });

  return (
    <nav className="fixed right-4 xl:right-16 top-1/2 -translate-y-1/2 select-none">
      <ul className="flex flex-col gap-1 xl:gap-2">
        {menu.map((item, index) => (
          <li
            key={`${item}-${index}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onTouchStart={() => handleMouseEnter(index)}
            onTouchEnd={() => handleMouseLeave(index)}
            className="cursor-pointer group"
          >
            <div onClick={item[1]} className="relative py-1">
              {/* Base text (gray) */}
              <span className="block text-2xl xl:text-6xl font-bold overflow-hidden text-gray-600/40 tracking-wider">
                {item[0]}
              </span>

              {/* Fill text (white) - positioned absolutely */}
              <div
                ref={(el) => {
                  fillRefs.current[index] = el;
                }}
                className="absolute top-0 left-0 w-0 h-full overflow-hidden"
              >
                <span className="block text-2xl xl:text-6xl font-bold text-white tracking-wider whitespace-nowrap py-1">
                  {item[0]}
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
