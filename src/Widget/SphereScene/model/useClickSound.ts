import React from "react";

/**
 * 클릭 시 효과음을 재생하는 커스텀 훅
 */
const useClickSound = () => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    // Web Audio API를 사용하여 간단한 클릭 사운드 생성
    const createClickSound = () => {
      const AudioContextClass = window.AudioContext || 
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // 클릭 사운드 설정 (짧고 톡톡한 클릭음)
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    };

    // 오디오 컨텍스트 초기화를 위한 더미 함수
    audioRef.current = {
      play: createClickSound
    } as HTMLAudioElement;
  }, []);

  const playClickSound = React.useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      console.warn("Audio playback failed:", error);
    }
  }, []);

  return playClickSound;
};

export default useClickSound;