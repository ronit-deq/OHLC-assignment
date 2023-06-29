import React, { Dispatch, SetStateAction } from "react";
import moment from "moment";
import { TIMEFRAME } from "../../Utils/constants";

interface OhlcFooterProps {
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const OhlcFooter: React.FC<OhlcFooterProps> = ({ setSelectedItem }) => {
  return (
    <div className="flex flex-row justify-between mx-10 footer px-5 py-4">
      <div className="flex flex-row justify-around">
        {Object.keys(TIMEFRAME).map((item) => {
          return (
            <button
              key={item}
              onClick={() => {
                setSelectedItem(item);
              }}
              className="timeframe-button"
            >
              <p className="m-2">{item}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-row footer" color="white">
        <p className="m-2">{moment().utc().format("hh:mm:ss (UTC)")}</p>
        <p className="m-2">| %</p>
        <p className="m-2">log</p>
        <p className="m-2">auto</p>
      </div>
    </div>
  );
};

export default OhlcFooter;
