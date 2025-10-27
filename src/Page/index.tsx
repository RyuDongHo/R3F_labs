import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Welcome from "./Welcome";

const Page = (): React.ReactElement => {
  return (
    <main className="w-full h-full">
      <Routes>
        <Route path="/labs" element={<Main />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </main>
  );
};

export default Page;
