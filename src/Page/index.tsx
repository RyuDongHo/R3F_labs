import { Route, Routes } from "react-router-dom";
import VehicleScene from "./VehicleScene";
import SphereScene from "./SphereScene";

const Page = (): React.ReactElement => {
  return (
    <main className="w-full h-full">
      <Routes>
        <Route path="/" element={<SphereScene />} />
        <Route path="/vehicle" element={<VehicleScene />} />
        <Route path="/sphere" element={<SphereScene />} />
      </Routes>
    </main>
  );
};

export default Page;
