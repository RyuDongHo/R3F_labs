import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/Shared/shadcn/components/ui/menubar";
import useMusicStore from "@/Shared/zustand/useMusicStore";
import React from "react";

const AppBar = (): React.ReactElement => {
  const {isPlaying, toggleMusic} = useMusicStore();
  return (
    <Menubar>
      {/* 테스트 목록 */}
      <MenubarMenu>
        <MenubarTrigger>Contact</MenubarTrigger>
        <MenubarContent>
          {/* 차량 테스트 */}
          {/* <MenubarItem onClick={() => navigate('/vehicle')}>
            Vehicle Test
          </MenubarItem> */}
          {/* 구체 테스트 */}
          <MenubarItem
            onClick={() => {
              window.open("https://github.com/RyuDongHo", "_blank");
            }}
          >
            Git
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* 배경 음악 선택 */}
      <MenubarMenu>
        <MenubarTrigger>Music {isPlaying ? "🎵" : "🔇"}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={toggleMusic}>
            {isPlaying ? "Off" : "On"}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AppBar;
