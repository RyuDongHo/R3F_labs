import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import TubeTest from "./TubeTest";

const Page = (): React.ReactElement => {
  return (
    <main className="w-full h-full">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tube" element={<TubeTest />} />
      </Routes>
    </main>
  );
};

export default Page;
