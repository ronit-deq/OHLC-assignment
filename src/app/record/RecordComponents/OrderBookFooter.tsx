import React from "react";
import { LuScreenShare } from "react-icons/lu";

const OrderBookFooter = () => {
  return (
    <div className="flex flex-row justify-between mx-8 footer px-5">
      <div>
        <LuScreenShare size={20} />
      </div>

      <div className="flex flex-row footer" color="white">
        <p className="m-2 text-blue-400 undeline underline-offset-2">
          FullBook |
        </p>
        <div className="m-2 h-4 w-4 bg-green-600 rounded-full	"></div>
        <p className="m-2">Real Time</p>
      </div>
    </div>
  );
};

export default OrderBookFooter;
