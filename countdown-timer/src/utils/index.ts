export const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / (60 * 60));
  const minutes = Math.floor((timeInSeconds / 60) % 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours > 9 ? hours : `0${hours}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }:${seconds > 9 ? seconds : `0${seconds}`}`;
};

export const getTimeInSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const handleTimeChange = (
  time: string,
  updatedValue: string,
  key: "hours" | "minutes" | "seconds"
): number => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  let newValue = parseInt(updatedValue);

  if (isNaN(newValue) || newValue < 0) return getTimeInSeconds(time);

  if (key === "hours" && newValue > 99) newValue = 99;
  if ((key === "minutes" || key === "seconds") && newValue > 59) newValue = 59;

  if (key === "hours") {
    return newValue * 60 * 60 + minutes * 60 + seconds;
  } else if (key === "minutes") {
    return hours * 60 * 60 + newValue * 60 + seconds;
  } else if (key === "seconds") {
    return hours * 60 * 60 + minutes * 60 + newValue;
  } else {
    return getTimeInSeconds(time);
  }
};
