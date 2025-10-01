import CurveScene from "@/Widget/CurveScene";
import SphereScene from "@/Widget/SphereScene";

const Main = (): React.ReactElement => {
  return (
    <main className="w-full overflow-y-auto">
      {/* Sphere Scene */}
      <div className="w-full h-[100vh] flex flex-col items-center justify-end pt-8 gap-2">
        {/* Title */}
        <div className=" xl:pb-4 flex flex-col gap-2">
          <p className=" xl:text-4xl text-lg">Crafting Digital Excellence</p>
          <p className=" xl:text-3xl text-sm font-light tracking-wider">
            Where Innovation Meets Artistry.
          </p>
          <p className=" xl:text-3xl text-sm font-light tracking-wider">
            Pushing Boundaries. Creating Tomorrow.
          </p>
        </div>
        <SphereScene />
        <div className="p-3 w-full flex justify-center">SCROLL TO SEE MORE</div>
      </div>
      {/* Tube Scene */}
      <div className="w-full h-[100vh] flex flex-col items-center justify-end pt-8 gap-2">
        {/* Title */}
        <div className=" xl:pb-4 flex flex-col gap-2">
          <p className=" xl:text-4xl text-lg">Crafting Digital Excellence</p>
          <p className=" xl:text-3xl text-sm font-light tracking-wider">
            Where Innovation Meets Artistry.
          </p>
          <p className=" xl:text-3xl text-sm font-light tracking-wider">
            Pushing Boundaries. Creating Tomorrow.
          </p>
        </div>
        <CurveScene />
        <div className="p-3 w-full flex justify-center">SCROLL TO SEE MORE</div>
      </div>
    </main>
  );
};
export default Main;
