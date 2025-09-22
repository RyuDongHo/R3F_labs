import { Route, Routes } from "react-router-dom";
import VehicleTest from "./VehicleTest";
import SphereTest from "./SphereTest";

const Page = () => {
  return (
    <main className="w-full h-full">
      <Routes>
        <Route path="/" element={<SphereTest />} />
        <Route path="/vehicle" element={<VehicleTest />} />
        <Route path="/sphere" element={<SphereTest />} />
      </Routes>
    </main>
  );
};

export default Page;
