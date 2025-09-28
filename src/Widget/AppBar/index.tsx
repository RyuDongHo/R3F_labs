import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/Shared/shadcn/components/ui/menubar"
import { useNavigate } from "react-router-dom";

const AppBar = (): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <Menubar>
      {/* 테스트 목록 */}
      <MenubarMenu>
        <MenubarTrigger>Labs</MenubarTrigger>
        <MenubarContent>
          {/* 차량 테스트 */}
          {/* <MenubarItem onClick={() => navigate('/vehicle')}>
            Vehicle Test
          </MenubarItem> */}
          {/* 구체 테스트 */}
          <MenubarItem onClick={() => navigate('/')}>
            Home
          </MenubarItem>
          {/* 튜브 테스트 */}
          <MenubarItem onClick={() => navigate('/tube')}>
            Tube Test
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* 배경 선택 */}
      <MenubarMenu>
        <MenubarTrigger>Background</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Default
          </MenubarItem>
          <MenubarItem>
            Night
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default AppBar;