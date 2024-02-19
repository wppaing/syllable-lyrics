import { parseMills } from "../utils";
import Syllable from "./lrc-syllable";
import cn from "classnames";

interface Props {
  currentTime: number;
  begin: string;
  end: string;
  span: {
    "@begin": string;
    "@end": string;
    "#text": string;
  }[];
}
const LrcLine = ({ currentTime, begin, end, span }: Props) => {
  const beginMills = parseMills(begin);
  const endMills = parseMills(end);
  const alreadyShown = currentTime > Number(endMills);
  const isCurrent =
    (currentTime >= Number(beginMills) && currentTime <= Number(endMills)) ||
    alreadyShown;

  return (
    <>
      <button
        begin={begin}
        end={end}
        className={cn("block !mb-14 text-left", isCurrent && "current")}
      >
        {span.map((span, j) => (
          <Syllable
            key={j}
            currentTime={currentTime}
            begin={span["@begin"]}
            end={span["@end"]}
            text={span["#text"]}
          />
        ))}
      </button>
    </>
  );
};

export default LrcLine;
