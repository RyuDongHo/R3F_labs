import AboutMeModal from "@/Widget/AboutMeModal";
import useAboutMeModalStore from "@/Shared/zustand/useAboutMeModalStore";
import React from "react";

const Modal = (): React.ReactElement => {
  const isAboutMeOpen = useAboutMeModalStore((state) => state.isOpen);

  return <>{isAboutMeOpen && <AboutMeModal />}</>;
};

export default Modal;
