import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/Shared/shadcn/components/ui/menubar";
import React from "react";
import useMusic from "./model/useMusic";

const AppBar = (): React.ReactElement => {
  const audioRef = React.useRef<HTMLAudioElement>(null!);
  const [isPlaying, toggleMusic] = useMusic({ audioRef });

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

      {/* 숨겨진 오디오 요소 */}
      <audio
        ref={audioRef}
        src="/music/In Dreamland by Chillpeach.mp3"
        style={{ display: "none" }}
      />
    </Menubar>
  );
};

export default AppBar;
