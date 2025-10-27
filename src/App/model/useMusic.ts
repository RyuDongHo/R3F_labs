import useMusicStore from "@/Shared/zustand/useMusicStore";
import React from "react";

type UseMusicProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const useMusic = (props: UseMusicProps) => {
  const { audioRef } = props;
  const { isPlaying } = useMusicStore();
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
    }
    if (isPlaying) {
      audioRef.current?.play().catch(console.error);
    } else {
      audioRef.current?.pause();
    }
  }, [audioRef, isPlaying]);
};

export default useMusic;
