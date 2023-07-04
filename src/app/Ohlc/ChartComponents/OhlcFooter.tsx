import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { TIMEMAPPING } from "@/app/Utils/constants";

interface OhlcFooterProps {
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const OhlcFooter: React.FC<OhlcFooterProps> = ({ setSelectedItem }) => {
  return (
    <div className="flex flex-row justify-between mx-10 footer px-5 py-4">
      <div className="flex flex-row justify-around">
        {Object.keys(TIMEMAPPING).map((timeStamp, timeFrameIndex) => {
          return (
            <button
              key={timeFrameIndex}
              onClick={() => {
                setSelectedItem(timeStamp);
              }}
              className="timeframe-button"
            >
              <p className="m-2">{timeStamp}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-row footer">
        <p className="m-2">{moment().utc().format("hh:mm:ss (UTC)")}</p>
        <p className="m-2">| %</p>
        <p className="m-2">log</p>
        <p className="m-2">auto</p>
      </div>
    </div>
  );
};

export default OhlcFooter;
