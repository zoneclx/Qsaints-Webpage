import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set volume to 30%
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      autoPlay
      src="/background-music.mp3"
      style={{ display: "none" }}
    />
  );
};

export default BackgroundMusic;
