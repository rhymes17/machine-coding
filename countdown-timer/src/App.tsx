import { useEffect, useRef, useState } from "react";
import "./App.css";
import { formatTime, getTimeInSeconds, handleTimeChange } from "./utils";

function App() {
  const [time, setTime] = useState(formatTime(0));
  const intervalRef = useRef<any>(null);

  const startTimer = () => {
    if (intervalRef.current != null) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const timeInSeconds = getTimeInSeconds(prevTime);

        if (timeInSeconds === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return formatTime(0);
        }

        return formatTime(timeInSeconds - 1);
      });
    }, 1 * 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(formatTime(0));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-black/10">
      <div className="h-[40vh] w-[60vw] border-black border-2 rounded-xl">
        <div className="flex justify-between h-full items-center gap-5 px-5">
          <TimePart time={time} setTime={setTime} timeKey="hours" />
          <TimePart time={time} setTime={setTime} timeKey="minutes" />
          <TimePart time={time} setTime={setTime} timeKey="seconds" />
        </div>

        <div className="h-[20%] flex gap-5 ">
          <Buttons title="Start" onClick={startTimer} />
          <Buttons title="Pause" onClick={pauseTimer} />
          <Buttons title="Reset" onClick={resetTimer} />
        </div>
      </div>
    </div>
  );
}

export default App;

const Buttons = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="cursor-pointer h-full border-black border-2 rounded-xl mt-5 flex-1 justify-center items-center"
      onClick={() => onClick()}
    >
      <h1 className="text-3xl h-full justify-center items-center flex">
        {title}
      </h1>
    </div>
  );
};

const TimePart = ({
  setTime,
  time,
  timeKey,
}: {
  setTime: React.Dispatch<React.SetStateAction<string>>;
  time: string;
  timeKey: "hours" | "minutes" | "seconds";
}) => {
  return (
    <div className="h-[70%] flex-1 border-black border-2 rounded-xl flex justify-center items-center">
      <input
        className="h-full w-full text-6xl flex-wrap text-center outline-none"
        onChange={(e) => {
          setTime((prevTime) => {
            return formatTime(
              handleTimeChange(prevTime, e.target.value, timeKey)
            );
          });
        }}
        value={
          time.split(":")[
            timeKey === "hours" ? 0 : timeKey === "minutes" ? 1 : 2
          ]
        }
      />
    </div>
  );
};
