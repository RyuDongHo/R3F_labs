import { create } from "zustand";

type AboutMeModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useAboutMeModalStore = create<AboutMeModalStore>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useAboutMeModalStore;
