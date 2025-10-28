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
