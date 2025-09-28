import AppBar from "@/Widget/AppBar";

const Header = (): React.ReactElement => {
  return (
    <div className=" w-fit absolute top-0 left-0 z-1">
      <AppBar />
    </div>
  );
};

export default Header;
