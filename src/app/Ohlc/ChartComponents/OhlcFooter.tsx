import moment from "moment";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TIMEFRAME } from "@/app/Utils/constants";

interface OhlcFooterProps {
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const OhlcFooter: React.FC<OhlcFooterProps> = ({ setSelectedItem }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleButtonChange = (): void => {
    setIsActive(!isActive);
  };
  return (
    <div className="flex flex-row justify-between mx-10 footer px-5 py-4">
      <div className="flex flex-row justify-around">
        {Object.keys(TIMEFRAME).map((timeStamp, timeFrameIndex) => {
          return (
            <button
              key={timeFrameIndex}
              onClick={() => {
                handleButtonChange;
                setSelectedItem(timeStamp);
              }}
              className={`timeframe-button + ${
                isActive ? "activeTimeStamp" : ""
              }`}
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
