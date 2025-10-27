import { create } from "zustand";

type Music = {
  volume: number;
  isPlaying: boolean;
  toggleMusic: () => void;
};

const useMusicStore = create<Music>()((set) => ({
  volume: 0.1,
  isPlaying: false,
  toggleMusic: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

export default useMusicStore;
