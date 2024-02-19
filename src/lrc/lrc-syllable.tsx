import { getGradientPercentage, parseMills } from "../utils";

interface Props {
  currentTime: number;
  begin: string;
  end: string;
  text: string;
}

const Syllable = ({ currentTime, begin, end, text }: Props) => {
  const beginMills = parseMills(begin || "");
  const endMills = parseMills(end || "");
  const style = {};
  const startTime = Number(beginMills);
  const endTime = Number(endMills);
  const isActive = currentTime >= startTime && currentTime <= endTime;
  const isGone = currentTime > endTime;

  if (isActive) {
    // @ts-expect-error
    style["--gradient-progress"] = getGradientPercentage(
      currentTime,
      +beginMills,
      +endMills
    );
    // @ts-expect-error
    style["transform"] = "matrix(1, 0, 0, 1, 0, -1)";
  } else if (isGone) {
    // @ts-expect-error
    style["--gradient-progress"] = "100%";
  } else {
    // @ts-expect-error
    style["--gradient-progress"] = "0%";
  }

  return (
    <span
      className="syllable inline-block transition-transform duration-100 ease-in"
      begin={begin}
      end={end}
      style={style}
    >
      {text}
    </span>
  );
};

export default Syllable;
