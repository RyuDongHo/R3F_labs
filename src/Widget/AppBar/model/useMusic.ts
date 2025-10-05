import React from "react";

type UseMusicProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const useMusic = (
  props: UseMusicProps
): [isPlaying: boolean, toggleMusic: () => void] => {
  const { audioRef } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, [audioRef]);
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return [isPlaying, toggleMusic];
};

export default useMusic;
