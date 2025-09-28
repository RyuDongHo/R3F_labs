import { Route, Routes } from "react-router-dom";
import Main from "./Main";

const Page = (): React.ReactElement => {
  return (
    <main className="w-full h-full">
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </main>
  );
};

export default Page;
