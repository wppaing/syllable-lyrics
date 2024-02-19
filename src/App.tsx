import { SyntheticEvent, useRef, useState } from "react";
import LrcView from "./lrc/lrc-view";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * We're not using default audio element's time update,
   * which only updates once per second, causing choppy animations.
   * Instead, manually set up a timer to update every 10 milliseconds
   * for smoother animations.
   */
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  function handleStart() {
    let localStartTime = 0;
    const now = Date.now();

    if (startTime) {
      localStartTime = now - startTime;
    } else {
      setStartTime(now);
      localStartTime = now;
    }
    intervalRef.current = setInterval(() => {
      const secondsPassed = Date.now() - localStartTime;
      setProgress(secondsPassed);
    }, 10);
  }

  function handleStop() {
    setStartTime(progress);
    clearInterval(intervalRef.current);
  }

  function handleSeek(e: SyntheticEvent<HTMLAudioElement, Event>) {
    const seekPos = (e.target as any).currentTime;
    setProgress(seekPos * 1000);
    setStartTime(seekPos * 1000);
  }

  return (
    <>
      <div className="bg-zinc-900 h-screen flex flex-col overflow-y-auto">
        <LrcView
          audioRef={audioRef}
          // milliseconds to seconds
          currentTime={progress / 1000}
        />

        <div className="sticky bottom-0 left-0 right-0 p-8 flex items-center justify-center">
          <audio
            ref={audioRef}
            src="/song.m4a"
            controls
            onPlay={handleStart}
            onPause={handleStop}
            onSeekedCapture={handleSeek}
          ></audio>
        </div>
      </div>
    </>
  );
}

export default App;
