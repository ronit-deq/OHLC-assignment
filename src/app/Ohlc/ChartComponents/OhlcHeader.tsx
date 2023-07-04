import React from "react";
import Link from "next/link";
import { AiOutlineDown } from "react-icons/ai";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { URL_PATHS } from "@/app/Utils/paths";

const OhlcHeader: React.FC = () => {
  return (
    <div className="flex flex-row justify-between pt-2 my-2">
      <div className="flex flex-row">
        <AiOutlineDown color="white" className="my-3" />
        <h2 className="m-2">
          <span className="font-bold">CHART </span>BTC/USD
        </h2>
      </div>

      <div className="flex flex-row justify-between">
        <input type="checkbox" id="showLiquidation" className="m-2 mb-1" />
        <label htmlFor="showLiquidation" className="showLiquidation mx-1 m-2">
          Show Liquidation
        </label>
        <FaCaretUp color="white" className="m-2" size={20} />
        <FaCaretDown color="white" className="m-2" size={20} />
        <BiRefresh color="#ccc" className="m-2" size={20} />
        <button className="record-button">
          <Link href={URL_PATHS.orderBook}>ORDER BOOK</Link>
        </button>
      </div>
    </div>
  );
};

export default OhlcHeader;
