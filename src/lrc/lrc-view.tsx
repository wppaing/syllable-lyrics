import { Fragment, RefObject } from "react";
import { parsedJson } from "../__mock__";
import LrcLine from "./lrc-line";

interface Props {
  audioRef: RefObject<HTMLAudioElement>;
  currentTime: number;
}
const LrcView = ({ currentTime }: Props) => {
  return (
    <div className="primary-vocals my-16 max-w-4xl mx-auto flex-1">
      {parsedJson.body.div.map((div, i) => (
        <Fragment key={i}>
          {div.p.map((p, idx) => (
            <LrcLine
              key={idx}
              currentTime={currentTime}
              begin={p["@begin"]}
              end={p["@end"]}
              span={p.span as any}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default LrcView;
